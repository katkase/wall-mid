import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String },
  sku: { type: String },
  frames: [{
    type: Schema.Types.ObjectId,
    ref: 'frame'
  }],
  lenses: [{
    type: Schema.Types.ObjectId,
    ref: 'lens'
  }]
});

ProductSchema.statics.addFrameToProduct = function(productId, frameId) {
  const Frame = mongoose.model('frame');
  return this.findById({ _id: productId })
    .then(product => {
      return Frame.findById({ _id: frameId })
        .then(frame => {
          frame.products.push(product);
          product.frames.push(frame);
          return Promise.all([frame.save(), product.save()])
            .then(([frame, product]) => product);
        });
    });
}

ProductSchema.statics.addLensToProduct = function(productId, lensId) {
  const Lens = mongoose.model('lens');
  return this.findById({ _id: productId })
    .then(product => {
      return Lens.findById({ _id: lensId })
        .then(lens => {
          lens.products.push(product);
          product.lenses.push(lens);
          return Promise.all([lens.save(), product.save()])
            .then(([lens, product]) => product);
        });
    });
}

ProductSchema.statics.findFrames = function(id) {
  return this.findById(id)
    .populate('frames')
    .then(product => product.frames);
}

ProductSchema.statics.findLenses = function(id) {
  return this.findById(id)
    .populate('lenses')
    .then(product => product.lenses);
}

const model = mongoose.model('product', ProductSchema);
export default model;
