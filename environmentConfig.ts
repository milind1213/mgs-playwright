// config/environmentConfig.ts
import { TEST_ENV, DB_PASSWORD } from './env';

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
    baseUrl: 'https://reg.yoursite.com',
    dbServer: 'reg-db.server.com',
    dbUser: 'reg_user',
    dbPassword: DB_PASSWORD,
  },
  QA: {
    name: 'QA',
    baseUrl: 'https://qa.yoursite.com',
    dbServer: 'qa-db.server.com',
    dbUser: 'qa_user',
    dbPassword: DB_PASSWORD,
  },
  STAGE: {
    name: 'STAGE',
    baseUrl: 'https://stage.yoursite.com',
    dbServer: 'stage-db.server.com',
    dbUser: 'stage_user',
    dbPassword: DB_PASSWORD,
  },
};

const selectedEnv = TEST_ENV.toUpperCase();
const currentConfig = environments[selectedEnv] || environments['REG'];

export default currentConfig;
