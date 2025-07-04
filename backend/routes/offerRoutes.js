import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import {
  createOffer,
  getAllOffers,
  deleteOffer
} from '../controllers/offerController.js';

const router = express.Router();

router.post('/', upload.single('image'), createOffer);
router.get('/', getAllOffers);
router.delete('/:id', deleteOffer);

export default router;
