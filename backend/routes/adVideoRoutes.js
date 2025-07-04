import express from 'express';
import { createAd, getAds, deleteAd } from '../controllers/adVideoController.js';

const router = express.Router();

router.post('/', createAd);
router.get('/', getAds);
router.delete('/:id', deleteAd);

export default router;
