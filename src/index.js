import cors from 'cors';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import './models';
import schema from './schema/schema';
import config from './config';
import { logger } from './logger';

const {
  MONGO_URI,
  port,
} = config;

if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI);
mongoose.connection
  .once('open', () => logger('Connected to MongoLab instance.', 'info'))
  .on('error', error => logger(`Error connecting to MongoLab: ${error}`, 'error'));

const app = express();
app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// app.use('/graphql', bodyParser.json(), graphqlExpress(request => (
//   {
//     schema,
//     rootValue: {
//       request,
//     },
//     formatError: (error) => {
//       const params = {
//         message: error.message,
//         locations: error.locations,
//         stack: error.stack,
//       };
//       logger(`message: '${error.message}', QUERY: '${request.body.query}'`, 'error');
//       // Optional ${request.body.operationName} ${request.body.variables}
//       return (params);
//     },
//   }
// )));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
app.listen(port, () => {
  logger(`Express listening on port ${port}`, 'info');
});
