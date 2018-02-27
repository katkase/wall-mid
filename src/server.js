import cors from 'cors';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import models from './models';
import schema from './schema/schema';
import config from './config';
import { logger } from './logger';

const {
  MONGO_URI,
  port
} = config;

if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

const server = express();
server.use(cors());

// server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
server.use('/graphql', bodyParser.json(), graphqlExpress(request => {
  return {
    schema,
    rootValue  : {
      request
    },
    formatError: error => {
      const params = {
        message  : error.message,
        locations: error.locations,
        stack    : error.stack
      };
      logger(`message: '${error.message}', QUERY: '${request.body.query}'`, 'error');
      // Optional ${request.body.operationName} ${request.body.variables}
      return (params);
    }
  }
}));
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));
server.listen(port, () => {
  logger('Express running', 'info');
  console.log('Listening on port', config.port);
});
