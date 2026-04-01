import express from 'express';
import {
  getCarousels,
  getCarouselsAdmin,
  createCarousel,
  deleteCarousel,
  updateCarousel,
} from '../controllers/carouselController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCarousels)
  .post(protect, admin, upload.single('image'), createCarousel);

router.route('/admin')
  .get(protect, admin, getCarouselsAdmin);

router.route('/:id')
  .put(protect, admin, upload.single('image'), updateCarousel)
  .delete(protect, admin, deleteCarousel);

export default router;
