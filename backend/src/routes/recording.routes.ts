import {
  createRecording,
  getResult,
  streamRecording,
  transcribePitch
} from '../controllers/recording.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

router.get('/:id/audio', authenticateToken, streamRecording);
router.get('/:id/result', authenticateToken, getResult);
router.post('/create-recording', authenticateToken, createRecording);
router.post('/:id/transcribe-pitch', authenticateToken, transcribePitch);
// router.post('/:id/analyze-overview', authenticateToken, analyzeOverview);
// router.post('/:id/analyze-content', authenticateToken, analyzeContent);
// router.post('/:id/analyze-pronunciation', authenticateToken, analyzePronunciation);
// router.post('/:id/analyze-intonation', authenticateToken, analyzeIntonation);
// router.post('/:id/analyze-fluency', authenticateToken, analyzeFluency);

export default router;