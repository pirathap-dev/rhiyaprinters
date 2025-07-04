import Offer from '../models/Offer.js';
import imgbbUploader from 'imgbb-uploader';

// Upload to ImgBB and create offer
export const createOffer = async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ error: 'Image URL is required' });
        }

        const newOffer = await Offer.create({ imageUrl });

        res.status(201).json(newOffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all offers
export const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find().sort({ createdAt: -1 });
        res.json(offers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete offer by ID
export const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.json({ message: 'Offer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
