require('dotenv').config();
const { execSync } = require('child_process');

const browsersPath = process.env.PLAYWRIGHT_BROWSERS_PATH;

if (!browsersPath) {
  console.error('❌ PLAYWRIGHT_BROWSERS_PATH is not set in the .env file');
  process.exit(1);
}

console.log(`📦 Installing Playwright browsers to: ${browsersPath}`);

process.env.PLAYWRIGHT_BROWSERS_PATH = browsersPath;
execSync('npx playwright install', { stdio: 'inherit' });
