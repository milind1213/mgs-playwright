import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialize, sendExecutionReportToSlack } from './utils/slackReporting.js'; 

dotenv.config();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const reportPath = path.resolve(__dirname, './playwright-report/index.html');
  const reportHeader = '🚀 Automated Test Executgit ion Report';

  try {
    await sendExecutionReportToSlack(
      reportPath,
      reportHeader,
      process.env.SLACK_CHANNEL_ID,
      process.env.SLACK_TOKEN
    );
    console.log('Report sent successfully!');
  } catch (error) {
    console.error('Failed to send report:', error);
  }
})();
