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
    return this.findById(id)
      .populate('products')
      .then(lens => lens.products);
  },
};

const model = mongoose.model('lens', LensSchema);

export default model;
