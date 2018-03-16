import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers/resolvers';

const typeDefs = `
  union Custom = Value | Values
  type Value {
    attribute_code: String
    value: String
  }
  type Values {
    attribute_code: String
    value: [String]
  }
  type Product {
    id: ID!
    name: String!
    sku: String!
    price: Float
    custom_attributes: [Custom]
  }
  type Query {
    products(id: ID!): [Product]!
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
