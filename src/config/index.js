import path from 'path';

import { MONGO_URI } from './mlab';

const logBaseDir = path.resolve(__dirname, '../../logs');

export default {
  logging: {
    json: false,
    logBaseDir,
    logLevel: 'verbose',
    maxSize: 10485760,
  },
  MONGO_URI,
  port: 4000,
};
