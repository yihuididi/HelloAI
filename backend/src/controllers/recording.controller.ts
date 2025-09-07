import config from '../config/config.js';
import logger from '../config/logger.js';
import r2 from '../config/r2.js';
import Recording from '../models/recording.model.js';
import User from '../models/user.model.js';
import { analyzePronunciationFile } from '../services/pronunciationAssessment.js';
import { AuthRequest } from '../types/authRequest.js';
import { RecordingRequest } from '../types/recordingRequest.js';
import { getUniqueRecordingName } from '../utils/getUniqueRecordingName.js';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { Request, Response } from 'express';

export const streamRecording = async (req: Request, res: Response): Promise<any> => {
  const { recording } = req as RecordingRequest;
  const objectKey = recording.r2Key;

  if (!objectKey) {
    logger.warn('Missing r2Key in recording');
    return res.status(400).json({ error: 'Missing r2Key in recording' });
  }

  try {
    logger.info(`Streaming recording with key=${objectKey}`);

    const command = new GetObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: objectKey
    });

    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 60 });
    logger.debug(`Generated signed URL for recording: ${signedUrl}`);

    const audioStream = await axios.get(signedUrl, { responseType: 'stream' });

    res.setHeader('Content-Type', audioStream.headers['content-type'] || 'audio/wav');
    res.setHeader('Content-Length', audioStream.headers['content-length'] || '');

    audioStream.data.pipe(res).on('error', (err: unknown) => {
      logger.error(`Stream error: ${err}`);
      res.end();
    });
  } catch (err) {
    logger.error(`Error streaming audio: ${err}`);
    res.status(500).json({ error: 'Error streaming audio' });
  }
};

export const getResult = async (req: Request, res: Response): Promise<any> => {
  const { recording } = req as RecordingRequest;
  logger.info(`Fetching result for recording=${recording._id}`);
  res.status(200).json({ result: recording.result });
};

export const createRecording = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req as AuthRequest;

  try {
    logger.info(`Creating new recording for user=${userId}`);
    const user = await User.findById(userId);
    if (!user) {
      logger.warn(`User not found: ${userId}`);
      return res.status(404).json({ error: 'User not found' });
    }

    const recordingName = await getUniqueRecordingName(userId);

    const newRecording = await Recording.create({
      userId: userId,
      name: recordingName,
      status: {
        overview: { status: 'not_started' },
        content: { status: 'not_started' },
        pronunciation: { status: 'not_started' },
        intonation: { status: 'not_started' },
        fluency: { status: 'not_started' }
      }
    });

    logger.info(`Recording created with id=${newRecording._id}`);
    res.status(201).json(newRecording);
  } catch (err) {
    logger.error(`Error creating recording: ${err}`);
    res.status(500).json({ error: 'Error creating recording' });
  }
};

export const transcribePitch = async (req: Request, res: Response): Promise<any> => {
  const { recording, file } = req as RecordingRequest;

  if (!file) {
    logger.warn('No filepath provided for transcription');
    return res.status(400).json({ error: 'No filepath provided' });
  }

  try {
    logger.info(`Starting transcription for recording=${recording._id}, file=${file.path}`);

    const form = new FormData();
    form.append('audio', fs.createReadStream(file.path));

    const response = await axios.post(
      `${config.PYTHON_SERVICE_URL}/api/recording/transcribe`,
      form,
      { headers: form.getHeaders() }
    );

    const transcript = response.data;
    logger.info(`Transcription finished for recording=${recording._id}`);

    await Recording.findByIdAndUpdate(recording._id, { transcript });

    res.json({ transcript });
  } catch (err) {
    logger.error(`Transcription error for recording=${recording._id}: ${err}`);
    res.status(500).json({ error: 'Transcription error' });
  }
};

export const analyzePronunciation = async (req: Request, res: Response): Promise<any> => {
  const { recording, file } = req as RecordingRequest;

  if (!file) {
    logger.warn('No filepath provided for pronunciation analysis');
    return res.status(400).json({ error: 'No filepath provided' });
  }

  const script = req.body.script;
  if (!script) {
    logger.warn('No script provided for pronunciation analysis');
    return res.status(400).json({ error: 'No script provided' });
  }

  try {
    logger.info(`Starting pronunciation analysis for recording=${recording._id}`);

    await Recording.findByIdAndUpdate(recording._id, {
      $set: { 'status.pronunciation': 'pending' }
    });

    const result = await analyzePronunciationFile(file, script);

    await Recording.findByIdAndUpdate(recording._id, {
      $set: {
        'status.pronunciation': 'done',
        'result.pronunciation': result
      }
    });

    logger.info(`Pronunciation analysis done for recording=${recording._id}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`Pronunciation error for recording=${recording._id}: ${err}`);

    await Recording.findByIdAndUpdate(recording._id, {
      $set: { 'status.pronunciation': 'failed' }
    });

    res.status(500).json({ error: 'Pronunciation error' });
  }
};