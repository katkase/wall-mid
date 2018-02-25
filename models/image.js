import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  name: { type: String },
  src: { type: String },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product'
  }
});

ImageSchema.statics.findProduct = function(id) {
  return this.findById(id)
    .populate('product')
    .then(image => image.product);
}

const model = mongoose.model('image', ImageSchema);
export default model;