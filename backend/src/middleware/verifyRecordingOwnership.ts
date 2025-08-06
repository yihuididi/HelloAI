import Recording from '../models/recording.model.js';
import { RecordingRequest } from '../types/recordingRequest.js';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export const verifyRecordingOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const recordingReq = req as RecordingRequest;
  const recordingId = recordingReq.params.id;
  const userId = recordingReq.userId;

  if (!mongoose.Types.ObjectId.isValid(recordingId) || !mongoose.Types.ObjectId.isValid(userId || '')) {
    return res.status(400).json({ error: 'Invalid recording ID or user ID' });
  }

  try {
    const recording = await Recording.findById(recordingId);
    if (!recording) {
      return res.status(404).json({ error: 'Recording not found' });
    }

    if (recording.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Attach recording doc to request object for downstream handlers
    recordingReq.recording = recording;
    next();
  } catch (err) {
    console.error('Error verifying recording ownership:', err);
    res.status(500).json({ error: 'Error verifying recording ownership' });
  }
};