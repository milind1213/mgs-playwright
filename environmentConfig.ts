// config/environmentConfig.ts
import * as dotenv from 'dotenv';
dotenv.config(); 

interface EnvConfig {
  name: string;
  baseUrl: string;
  dbServer: string;
  dbUser: string;
  dbPassword: string;
}

const environments: Record<string, EnvConfig> = {
  REG: {
    name: 'REG',
    baseUrl: 'https://automationexercise.com/',
    dbServer: 'localhost',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
  },

  QA: {
    name: 'QA',
    baseUrl: 'https://qa.yoursite.com',
    dbServer: 'qa-db.server.com',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
  },

  STAGE: {
    name: 'STAGE',
    baseUrl: 'https://stage.yoursite.com',
    dbServer: 'stage-db.server.com',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
  },
};

const selectedEnv = (process.env.TEST_ENV || 'REG').toUpperCase();
const currentConfig = environments[selectedEnv];

export default currentConfig;
