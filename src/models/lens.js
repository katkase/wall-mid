import mongoose, { Schema } from 'mongoose';

const LensSchema = new Schema({
  name: { type: String },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'product',
  }],
});

LensSchema.statics = {
  findProducts(id) {
    const Lens = mongoose.model('lens');
    return Lens.findById(id)
      .populate('products')
      .then(lens => lens.products);
  },
};

const model = mongoose.model('lens', LensSchema);

export default model;
