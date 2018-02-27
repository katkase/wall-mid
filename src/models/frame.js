import mongoose, { Schema } from 'mongoose';

const FrameSchema = new Schema({
  name: { type: String },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'product',
  }],
});

FrameSchema.statics = {
  findProducts(id) {
    return this.findById(id)
      .populate('products')
      .then(frame => frame.products);
  },
};

const model = mongoose.model('frame', FrameSchema);

export default model;
