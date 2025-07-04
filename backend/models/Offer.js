import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Offer', offerSchema);
