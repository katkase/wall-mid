import mongoose from 'mongoose';

const Product = mongoose.model('product');
const Frame = mongoose.model('frame');
const Lens = mongoose.model('lens');

const resolvers = {
  Query : {
    products: () => Product.find({}),
    product: (root, { id }) => Product.findById({ _id: id }),
    frames: () => Frame.find({}),
    frame: (root, { id }) => Frame.findById({ _id: id }),
    lenses: () => Lens.find({}),
    lens: (root, { id }) => Lens.findById({ _id: id }),
  },
  Product: {
    frames: (product) => Product.findFrames(product.id),
    lenses: (product) => Product.findLenses(product.id)
  },
  Frame: {
    products: (frame) => Frame.findProducts(frame.id)
  },
  Lens: {
    products: (lens) => Lens.findProducts(lens.id)
  },
  Mutation: {
    addProduct: (root, { name, sku }) => new Product({ name: name, sku: sku }).save(),
    deleteProduct: (root, { id }) => Product.remove({ _id: id }),
    addFrame: (root, { name }) => new Frame({ name: name }).save(),
    deleteFrame: (root, { id }) => Frame.remove({ _id: id }),
    addLens: (root, { name }) => new Lens({ name: name }).save(),
    deleteLens: (root, { id }) => Lens.remove({ _id: id }),
    addFrameToProduct: (root, { productId, frameId }) => Product.addFrameToProduct(productId, frameId),
    addLensToProduct: (root, { productId, lensId }) => Product.addLensToProduct(productId, lensId),
  }
}

export default resolvers;