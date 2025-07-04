import mongoose from 'mongoose';

const adVideoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('AdVideo', adVideoSchema);
