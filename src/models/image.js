import mongoose, { Schema } from 'mongoose';

const ImageSchema = new Schema({
  name: { type: String },
  src: { type: String },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
});

ImageSchema.statics = {
  findProduct(id) {
    const Image = mongoose.model('image');
    return Image.findById(id)
      .populate('product')
      .then(image => image.product);
  },
};

const model = mongoose.model('image', ImageSchema);

export default model;
