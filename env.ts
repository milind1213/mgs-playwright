import * as dotenv from 'dotenv';
dotenv.config();

export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
export const PLAYWRIGHT_BROWSERS_PATH = process.env.PLAYWRIGHT_BROWSERS_PATH;
export const PLAYWRIGHT_HTML_REPORT = process.env.PLAYWRIGHT_HTML_REPORT || 'playwright-report';

export const TEST_ENV = process.env.TEST_ENV || 'REG';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';