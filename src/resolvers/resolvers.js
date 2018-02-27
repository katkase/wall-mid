import mongoose from 'mongoose';

const Product = mongoose.model('product');
const Image = mongoose.model('image');
const Frame = mongoose.model('frame');
const Lens = mongoose.model('lens');

const resolvers = {
  Query: {
    products: () => Product.find({}),
    product: (root, { id }) => Product.findById({ _id: id }),
    images: () => Image.find({}),
    image: (root, { id }) => Image.findById({ _id: id }),
    frames: () => Frame.find({}),
    frame: (root, { id }) => Frame.findById({ _id: id }),
    lenses: () => Lens.find({}),
    lens: (root, { id }) => Lens.findById({ _id: id }),
  },
  Product: {
    images: product => Product.findImages(product.id),
    frames: product => Product.findFrames(product.id),
    lenses: product => Product.findLenses(product.id),
  },
  Image: {
    product: image => Image.findProduct(image.id),
  },
  Frame: {
    products: frame => Frame.findProducts(frame.id),
  },
  Lens: {
    products: lens => Lens.findProducts(lens.id),
  },
  Mutation: {
    addProduct: (root, { name, sku }) => new Product({ name, sku }).save(),
    deleteProduct: (root, { id }) => Product.remove({ _id: id }),
    addImage: (root, { name, src }) => new Image({ name, src }).save(),
    deleteImage: (root, { id }) => Image.remove({ _id: id }),
    addFrame: (root, { name }) => new Frame({ name }).save(),
    deleteFrame: (root, { id }) => Frame.remove({ _id: id }),
    addLens: (root, { name }) => new Lens({ name }).save(),
    deleteLens: (root, { id }) => Lens.remove({ _id: id }),
    addImageToProduct: (root, { productId, imageId }) =>
      Product.addImageToProduct(productId, imageId),
    addFrameToProduct: (root, { productId, frameId }) =>
      Product.addFrameToProduct(productId, frameId),
    addLensToProduct: (root, { productId, lensId }) =>
      Product.addLensToProduct(productId, lensId),
  },
};

export default resolvers;
