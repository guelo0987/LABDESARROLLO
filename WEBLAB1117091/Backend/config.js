import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mapeo de nombres de ambiente
const envMap = {
  'development': 'dev.env',
  'production': 'production.env',
  'qas': 'qas.env'
};

const envFile = envMap[process.env.NODE_ENV] || 'dev.env';

dotenv.config({
  path: resolve(__dirname, `../${envFile}`)
});

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: parseInt(process.env.PORT || '5000')
};