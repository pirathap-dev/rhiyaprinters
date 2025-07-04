import AdVideo from '../models/AdVideo.js';
import cloudinary from '../utils/cloudinary.js';

export const createAd = async (req, res) => {
    try {
        const { videoUrl, publicId } = req.body;

        if (!videoUrl) {
            return res.status(400).json({ error: 'videoUrl is required' });
        }

        const newAd = await AdVideo.create({ videoUrl, publicId });

        // Limit total ads to 20
        const total = await AdVideo.countDocuments();
        if (total > 20) {
            const extras = await AdVideo.find().sort({ createdAt: 1 }).limit(total - 20);
            for (const ad of extras) {
                await ad.deleteOne();
            }
        }

        res.status(201).json(newAd);
    } catch (error) {
        console.error('Error saving video URL:', error);
        res.status(500).json({ error: 'Failed to save video URL' });
    }
};

export const getAds = async (req, res) => {
    try {
        const ads = await AdVideo.find().sort({ createdAt: -1 });
        res.json(ads);
    } catch (err) {
        res.status(500).json({ error: 'Fetch failed' });
    }
};

export const deleteAd = async (req, res) => {
    try {
        const ad = await AdVideo.findById(req.params.id);
        if (!ad) return res.status(404).json({ error: 'Ad not found' });

        await cloudinary.uploader.destroy(ad.publicId, { resource_type: 'video' });
        await ad.deleteOne();

        res.json({ message: 'Ad deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Delete failed' });
    }
};
