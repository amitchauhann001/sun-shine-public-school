import express from 'express';
import {
  getAnnouncements,
  getAnnouncementsAdmin,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAnnouncements)
  .post(protect, admin, createAnnouncement);

router.route('/admin')
  .get(protect, admin, getAnnouncementsAdmin);

router.route('/:id')
  .put(protect, admin, updateAnnouncement)
  .delete(protect, admin, deleteAnnouncement);

export default router;
