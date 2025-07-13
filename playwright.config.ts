import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  // ⏱ Global timeout per test (60 seconds)
  timeout: 60 * 1000, 
  globalTimeout: 120 * 1000, // ⏱ Global timeout for all tests
  expect: {
    // ⏱ Max wait for expect conditions
    timeout: 50 * 1000, 
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 1, 
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['list'], 
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
    // ⏱ Max time for single action
    actionTimeout: 10 * 1000, 
    navigationTimeout: 30 * 1000, 
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  outputDir: 'test-results/', // Stores traces, videos, etc.
});
