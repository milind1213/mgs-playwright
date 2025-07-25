import { WebClient } from '@slack/web-api';
import fs from 'fs';
import path from 'path';

let slackClient;

export async function initialize(slackToken, channelId) {
  if (!slackToken || !channelId) {
    throw new Error('Slack token or channel ID is missing.');
  }
  try {
    slackClient = new WebClient(slackToken);
    const response = await slackClient.conversations.info({ channel: channelId });
    if (!response.ok) {
      throw new Error(`Failed to verify Slack channel: ${response.error}`);
    }
    console.log('✅ Slack client initialized.');
  } catch (error) {
    console.error('❌ Error initializing Slack client:', error.message || error);
    throw error;
  }
}

export async function sendExecutionReportToSlack(reportPath, reportHeader, slackChannelId, slackToken) {
  const client = new WebClient(slackToken);
  const filePath = path.resolve(reportPath);

  async function checkFileExists() {
    let retries = 3;
    while (retries > 0) {
      if (fs.existsSync(filePath)) {
        return true;
      }
      retries--;
      console.log('File not found, retrying in 5 seconds...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    console.error('File not found after 3 retries.');
    return false;
  }

  const fileExists = await checkFileExists();
  if (!fileExists) return;

  try {
    console.log('📤 Uploading report to Slack...');
    const fileStream = fs.createReadStream(filePath);

    const response = await client.files.uploadV2({
      channel_id: slackChannelId,
      initial_comment: reportHeader,
      file: fileStream,
      filename: path.basename(filePath),
    });

    if (
      response.ok &&
      response.files &&
      response.files.length > 0 &&
      response.files[0].id
    ) {
      console.log('✅ Report uploaded successfully to Slack!');
      console.log('📎 File ID:', response.files[0].id);
      console.log('🔗 File URL:', response.files[0].permalink_public || 'No public link available');
    } else {
      console.error('❌ Upload failed. Slack API response:', JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ Error uploading file to Slack:', error.message || error);
  }
}
