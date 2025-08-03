import { getMe, getRecordings } from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

router.get('/me', authenticateToken, getMe);
router.get('/recordings', authenticateToken, getRecordings);

export default router;