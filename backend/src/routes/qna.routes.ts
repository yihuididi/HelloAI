import express from 'express';
import { endSession, input, newSession } from '../controllers/qna.controller.js';

const router = express.Router();

router.post('/create-session', newSession);
router.post('/input', input);
router.post('/end-session', endSession);

export default router;