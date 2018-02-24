import cors from 'cors';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import models from './models';
import schema from './schema/schema';

const MONGO_URI = '';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

const server = express();
server.use(cors());

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));
server.listen(4000, () => {
  console.log('Listening on port 4000');
});


