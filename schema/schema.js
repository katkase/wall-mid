import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from '../resolvers/resolvers';

const typeDefs = `
  type Frame {
    id: ID!
    name: String!
    products: [Product]
  }
  type Lens {
    id: ID!
    name: String!
    products: [Product]
  }
  type Image {
    id: ID!
    name: String!
    src: String!
    product: Product
  }
  type Product {
    id: ID!
    name: String!
    sku: String!
    images: [Image]
    frames: [Frame]
    lenses: [Lens]
  }
  type Query {
    products: [Product]
    product(id: ID!): Product
    images: [Image]
    image(id: ID!): Image
    frames: [Frame]
    frame(id: ID!): Frame
    lenses: [Lens]
    lens(id: ID!): Lens
  }
  type Mutation {
    addProduct(name: String!, sku: String!): Product
    deleteProduct(id: ID!): Product
    addImage(name: String!, src: String!): Image
    deleteImage(id: ID!): Image
    addFrame(name: String!): Frame
    deleteFrame(id: ID!): Frame
    addLens(name: String!): Lens
    deleteLens(id: ID!): Lens
    addImageToProduct(productId: ID!, imageId: ID!): Product
    addFrameToProduct(productId: ID!, frameId: ID!): Product
    addLensToProduct(productId: ID!, lensId: ID!): Product
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema });

export default schema;
