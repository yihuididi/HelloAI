import logger from '../config/logger.js';
import Recording from '../models/recording.model.js';
import { RecordingRequest } from '../types/recordingRequest.js';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export const verifyRecordingOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const recordingReq = req as RecordingRequest;
  const recordingId = recordingReq.params.id;
  const userId = recordingReq.userId;

  if (!mongoose.Types.ObjectId.isValid(recordingId) || !mongoose.Types.ObjectId.isValid(userId || '')) {
    logger.warn(`Invalid recording ID or user ID. recordingId=${recordingId}, userId=${userId}`);
    res.status(400).json({ error: 'Invalid recording ID or user ID' });
    return;
  }

  try {
    const recording = await Recording.findById(recordingId);
    if (!recording) {
      logger.warn(`Recording not found. recordingId=${recordingId}`);
      res.status(404).json({ error: 'Recording not found' });
      return;
    }

    if (recording.userId.toString() !== userId) {
      logger.warn(`Unauthorized access attempt. recordingId=${recordingId}, userId=${userId}`);
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    // Attach recording doc to request object for downstream handlers
    recordingReq.recording = recording;
    logger.info(`Recording ownership verified. recordingId=${recordingId}, userId=${userId}`);
    next();
  } catch (err) {
    logger.error('Error verifying recording ownership:', err);
    res.status(500).json({ error: 'Error verifying recording ownership' });
  }
};