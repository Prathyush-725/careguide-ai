import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nodeEnv = (process.env.NODE_ENV || 'development').toLowerCase();
const isProduction = nodeEnv === 'production';

if (!isProduction) {
  dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}

const demoMode = process.env.DEMO_MODE === 'true' || process.env.DEMO_MODE === '1' || isProduction;

export const env = {
  nodeEnv,
  isProduction,
  demoMode,
  port: Number(process.env.PORT) || (isProduction ? 8080 : 4000),
  host: isProduction ? '0.0.0.0' : process.env.HOST || '127.0.0.1',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  aiProvider: (process.env.AI_PROVIDER || 'mock').toLowerCase(),
  dataFileName: demoMode ? 'demo-store.json' : process.env.DATA_FILE || 'store.json',
  defaultUserName: demoMode ? 'Alex Morgan' : process.env.DEFAULT_USER_NAME || 'Alex Morgan',
};
