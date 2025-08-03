import { config } from '../config/config.js';
import { r2 } from '../config/r2.js';
import Recording from '../models/recording.model.js';
import User from '../models/user.model.js';
import { AuthRequest } from '../types/authRequest.js';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import axios from 'axios';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

const verifyRecordingOwnership = async (recordingId: string, userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(recordingId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return { error: 1, recording: null };
  }

  const recording = await Recording.findById(recordingId);
  if (!recording) return { error: 2, recording: null };
  if (recording.userId.toString() !== userId.toString()) return { error: 3, recording: null };
  return { error: null, recording: recording };
};

export const streamRecording = async (req: Request, res: Response): Promise<any> => {
  const recordingId = req.params.id;
  const userId = (req as AuthRequest).userId;

  try {
    const { error, recording } = await verifyRecordingOwnership(recordingId, userId);
    if (error === 1) return res.status(400).json({ error: 'Invalid recording ID' });
    if (error === 2) return res.status(404).json({ error: 'Recording not found' });
    if (error === 3) return res.status(403).json({ error: 'Unauthorized' });

    const objectKey = recording!.r2Key;
    if (!objectKey) return res.status(400).json({ error: 'Missing r2Key in recording' });

    const command = new GetObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: objectKey
    });

    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 60 });

    // Proxy the signed URL to the client
    const audioStream = await axios.get(signedUrl, {
      responseType: 'stream',
    });

    res.setHeader('Content-Type', audioStream.headers['content-type'] || 'audio/wav');
    res.setHeader('Content-Length', audioStream.headers['content-length'] || '');
    audioStream.data.pipe(res).on('error', (err: unknown) => {
      console.error('Stream error:', err);
      res.end();
    });
  } catch (err) {
    console.error('Error streaming audio:', err);
    res.status(500).json({ error: 'Error streaming audio' });
  }
};

export const getResult = async (req: Request, res: Response): Promise<any> => {
  const recordingId = req.params.id;
  const userId = (req as AuthRequest).userId;

  try {
    const { error, recording } = await verifyRecordingOwnership(recordingId, userId);
    if (error === 1) return res.status(400).json({ error: 'Invalid recording ID' });
    if (error === 2) return res.status(404).json({ error: 'Recording not found' });
    if (error === 3) return res.status(403).json({ error: 'Unauthorized' });

    res.status(200).json({ result: recording!.result });
  } catch (err) {
    console.error('Error getting result:', err);
    res.status(500).json({ error: 'Error getting result' });
  }
};

export const createRecording = async (req: Request, res: Response): Promise<any> => {
  const userId = (req as AuthRequest).userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
  } catch (err) {
    console.error('Error verifying user:', err);
    res.status(500).json({ error: 'Error verifying user' });
  }

  // Generate unique name for each recording
  const baseName = 'New Recording';
  const existingNames = await Recording.find({
    userId,
    name: { $regex: `${baseName}( \\d+)?$` }
  }).select('name');
  const usedNumbers = new Set<number>();
  existingNames.forEach(doc => {
    const match = doc.name.match(/^New Recording(?: (\d+))?$/);
    if (!match) return;
    const num = match[1] ? parseInt(match[1], 10) : 1;
    usedNumbers.add(num);
  })

  // Find the first unused number
  let suffix = '';
  for (let i = 1; i <= usedNumbers.size + 1; i++) {
    if (!usedNumbers.has(i)) {
      suffix = i === 1 ? '' : ` ${i}`;
      break;
    }
  }

  const recordingName = `${baseName}${suffix}`;

  try {
    const newRecording = await Recording.create({
      userId: userId,
      name: recordingName,
      result: {
        overview: {
          status: 'not_started'
        },
        content: {
          status: 'not_started'
        },
        pronunciation: {
          status: 'not_started'
        },
        intonation: {
          status: 'not_started'
        },
        fluency: {
          status: 'not_started'
        }
      }
    });

    res.status(201).json(newRecording);
  } catch (err) {
    console.error('Error creating recording:', err);
    res.status(500).json({ error: 'Error creating recording' });
  }
};

export const transcribePitch = async (req: Request, res: Response): Promise<any> => {

}