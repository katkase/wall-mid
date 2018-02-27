import winston from 'winston';
import path from 'path';

import config from '../config';

const {
  logging: {
    json,
    logBaseDir,
    logLevel,
    maxSize
  }
} = config;

winston.level = logLevel;

let fileTransports = [];

if (logBaseDir) {
  fileTransports = [
    new winston.transports.File({
      name: 'verbose-logging',
      level: 'verbose',
      timestamp: new Date(),
      filename: path.resolve(logBaseDir, 'wall-mid-verbose.log'),
      maxSize,
      zippedArchive: true,
      json
    }),
    new winston.transports.File({
      name: 'error-logging',
      level: 'error',
      filename: path.resolve(logBaseDir, 'wall-mid-error.log'),
      maxSize,
      zippedArchive: true,
      json
    })
  ];
}

winston.configure({
  transports: [
    ...fileTransports,
    new (winston.transports.Console)({
      colorize: true
    })
  ]
});

export const logger = (msg, level = 'warn') => {
  winston.log(level, msg);
};

export default { 
  logger 
};
