import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({}, { strict: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: { type: String, required: true },
  sub: { type: String, required: true },              // e.g., Round Neck T-Shirt
  hasVariants: { type: Boolean, default: false },
  variants: {
    type: Map,                                          // e.g., { "Red": { S: 2, M: 3 } }
    of: variantSchema
  },
  variantImages: {
    type: Map,                                          // e.g., { "Red": "/image.png" }
    of: String
  },
  stock: Number,                                       // only for non-variant products
  image: String,
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
