import path from 'path';

const logBaseDir = path.resolve(__dirname, '../../logs');

const env = process.env.NODE_ENV || 'dev';

const dev = {
  logging: {
    json: false,
    logBaseDir,
    logLevel: 'debug',
    maxSize: 10485760,
  },
  port: 4000,
};

const prod = {
  logging: {
    json: false,
    logBaseDir,
    logLevel: 'error',
    maxSize: 10485760,
  },
  port: 4000,
};

const config = {
  dev,
  prod,
};

export default config[env];
