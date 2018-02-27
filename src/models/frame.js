import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FrameSchema = new Schema({
  name: { type: String },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'product'
  }]
});

FrameSchema.statics.findProducts = function(id) {
  return this.findById(id)
    .populate('products')
    .then(frame => frame.products);
}

const model = mongoose.model('frame', FrameSchema);
export default model;
