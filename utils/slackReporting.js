const { WebClient } = require('@slack/web-api');
const fs = require('fs');
const path = require('path');

let slackClient;

// Initialize Slack WebClient
async function initialize(slackToken, channelId) {
  if (!slackToken || !channelId) {
    throw new Error('Slack token or channel ID is missing. Please check environment variables.');
  }
  try {
    slackClient = new WebClient(slackToken);
    const response = await slackClient.conversations.info({ channel: channelId });
    if (!response.ok) {
      throw new Error(`Failed to verify Slack channel: ${response.error}`);
    }
    console.log('Slack client initialized successfully.');
  } catch (error) {
    console.error(`Error initializing Slack client: ${error.message || error}`);
    throw error;
  }
}

// Send HTML report to Slack
async function sendExecutionReportToSlack(reportPath, reportHeader, slackChannelId, slackToken) {
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
    console.log('Sending report to Slack...');
    const fileStream = fs.createReadStream(filePath);

    const response = await client.files.uploadV2({
      channel_id: slackChannelId,
      initial_comment: reportHeader,
      file: fileStream,
      filename: path.basename(filePath),
    });

    if (response.files && response.files.length > 0 && response.files[0].id) {
      console.log('Report sent successfully:', response.files[0].id);
      console.log('File URL:', response.files[0].permalink_public || 'No public link');
    } else {
      console.error('Failed to upload the report to Slack:', response);
    }
  } catch (error) {
    console.error('Error uploading file to Slack:', error.message || error);
  }
}

module.exports = {
  initialize,
  sendExecutionReportToSlack,
};
