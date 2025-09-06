import {
  analyzePronunciation,
  createRecording,
  getResult,
  streamRecording,
  transcribePitch
} from '../controllers/recording.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateAudio } from '../middleware/validateAudio.js';
import { verifyRecordingOwnership } from '../middleware/verifyRecordingOwnership.js';
import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/:id/audio', authenticateToken, verifyRecordingOwnership, streamRecording);
router.get('/:id/result', authenticateToken, verifyRecordingOwnership, getResult);
router.post('/create-recording', authenticateToken, createRecording);
router.post('/:id/transcribe-pitch', authenticateToken, verifyRecordingOwnership, upload.single('pitch'), validateAudio, transcribePitch);
// router.post('/:id/analyze-overview', authenticateToken, analyzeOverview);
// router.post('/:id/analyze-content', authenticateToken, analyzeContent);
router.post('/:id/analyze-pronunciation', authenticateToken, verifyRecordingOwnership, upload.single('pitch'), validateAudio, analyzePronunciation);
// router.post('/:id/analyze-intonation', authenticateToken, analyzeIntonation);
// router.post('/:id/analyze-fluency', authenticateToken, analyzeFluency);

export default router;