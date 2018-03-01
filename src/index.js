import cors from 'cors';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';

import schema from './schema/schema';
import config from './config';
import { logger } from './logger';

const {
  port,
} = config;

const app = express();
app.use(cors());

// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphql', bodyParser.json(), graphqlExpress(request => (
  {
    schema,
    rootValue: {
      request,
    },
    formatError: (error) => {
      const params = {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
      logger(`message: '${error.message}', QUERY: '${request.body.query}'`, 'error');
      // Optional ${request.body.operationName} ${request.body.variables}
      return (params);
    },
  }
)));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
app.listen(port, () => {
  logger(`Express listening on port ${port}`, 'info');
});
