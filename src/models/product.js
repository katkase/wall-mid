import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String },
  sku: { type: String },
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'image',
  }],
  frames: [{
    type: Schema.Types.ObjectId,
    ref: 'frame',
  }],
  lenses: [{
    type: Schema.Types.ObjectId,
    ref: 'lens',
  }],
});

ProductSchema.statics = {
  addImageToProduct(productId, imageId) {
    return this.findById({ _id: productId })
      .then((product) => {
        const Image = mongoose.model('image');
        return Image.findById({ _id: imageId })
          .then((image) => {
            image.set({ product });
            product.images.push(image);
            return Promise.all([image.save(), product.save()])
              .then(() => product);
          });
      });
  },
  addFrameToProduct(productId, frameId) {
    return this.findById({ _id: productId })
      .then((product) => {
        const Frame = mongoose.model('frame');
        return Frame.findById({ _id: frameId })
          .then((frame) => {
            frame.products.push(product);
            product.frames.push(frame);
            return Promise.all([frame.save(), product.save()])
              .then(() => product);
          });
      });
  },
  addLensToProduct(productId, lensId) {
    return this.findById({ _id: productId })
      .then((product) => {
        const Lens = mongoose.model('lens');
        return Lens.findById({ _id: lensId })
          .then((lens) => {
            lens.products.push(product);
            product.lenses.push(lens);
            return Promise.all([lens.save(), product.save()])
              .then(() => product);
          });
      });
  },
  findImages(id) {
    return this.findById(id)
      .populate('images')
      .then(product => product.images);
  },
  findFrames(id) {
    return this.findById(id)
      .populate('frames')
      .then(product => product.frames);
  },
  findLenses(id) {
    return this.findById(id)
      .populate('lenses')
      .then(product => product.lenses);
  },
};

const model = mongoose.model('product', ProductSchema);

export default model;
