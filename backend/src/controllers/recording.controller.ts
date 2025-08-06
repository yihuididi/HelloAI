import { config } from '../config/config.js';
import { r2 } from '../config/r2.js';
import Recording from '../models/recording.model.js';
import User from '../models/user.model.js';
import { AuthRequest } from '../types/authRequest.js';
import { RecordingRequest } from '../types/recordingRequest.js';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { Request, Response } from 'express';

export const streamRecording = async (req: Request, res: Response): Promise<any> => {
  const { recording } = req as RecordingRequest;
  const objectKey = recording.r2Key;
  if (!objectKey) return res.status(400).json({ error: 'Missing r2Key in recording' });

  try {
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
  const { recording } = req as RecordingRequest;
  res.status(200).json({ result: recording.result });
};

export const createRecording = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req as AuthRequest;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

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

    const newRecording = await Recording.create({
      userId: userId,
      name: recordingName,
      result: {
        overview: { status: 'not_started' },
        content: { status: 'not_started' },
        pronunciation: { status: 'not_started' },
        intonation: { status: 'not_started' },
        fluency: { status: 'not_started' }
      }
    });

    res.status(201).json(newRecording);
  } catch (err) {
    console.error('Error creating recording:', err);
    res.status(500).json({ error: 'Error creating recording' });
  }
};

export const transcribePitch = async (req: Request, res: Response): Promise<any> => {
  const { recording, file } = req as RecordingRequest;
  if (!file) return res.status(400).json({ error: 'No filepath provided' });

  try {
    const form = new FormData();
    form.append('audio', fs.createReadStream(file.path))

    const response = await axios.post(
      `${config.PYTHON_SERVICE_URL}/api/recording/transcribe`,
      form,
      { headers: form.getHeaders() }
    );

    const transcript = response.data;

    await Recording.findByIdAndUpdate(recording._id, {
      transcript: transcript,
    });

    res.json({ transcript: transcript });
  } catch (err) {
    console.error('Transcription error:', err);
    res.status(500).json({ error: 'Transcription error' });
  }
}