import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { submitAdmission } from '../controllers/admissionController.js';

const router = express.Router();

router.post('/', upload.single('photo'), submitAdmission);

export default router;
