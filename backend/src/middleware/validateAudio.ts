import logger from '../config/logger.js';
import { exec } from 'child_process';
import { NextFunction, Request, Response } from 'express';
import path from 'path';

const allowedMimeTypes = ['audio/wav', 'audio/x-wav', 'audio/wave'];

export const validateAudio = (req: Request, res: Response, next: NextFunction): void => {
  const { file } = req;

  if (!file) {
    logger.warn('No audio file uploaded');
    res.status(400).json({ error: 'No audio file uploaded.' });
    return;
  }

  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.wav') {
    logger.warn(`Invalid file extension: ${file.originalname}`);
    res.status(400).json({ error: 'Only .wav files are accepted' });
    return;
  }

  if (!allowedMimeTypes.includes(file.mimetype)) {
    logger.warn(`Invalid MIME type: ${file.mimetype} for file ${file.originalname}`);
    res.status(400).json({ error: 'Invalid MIME type. Only wav audio is supported' });
    return;
  }

  const filepath = file.path;

  // ffmpeg/ffprobe must be installed on machine
  exec(
    `ffprobe -v error -select_streams a:0 -show_entries stream=sample_rate,channels -of default=noprint_wrappers=1 "${filepath}"`,
    (err, stdout, stderr) => {
      if (err) {
        logger.error(`ffprobe error for file ${file.originalname}: ${stderr}`);
        res.status(400).json({ error: 'Failed to analyze audio file.' });
        return;
      }

      const sampleRate = parseInt(stdout.match(/sample_rate=(\d+)/)?.[1] || '0', 10);
      const channels = parseInt(stdout.match(/channels=(\d+)/)?.[1] || '0', 10);

      if (channels !== 1) {
        logger.warn(`Audio file ${file.originalname} has ${channels} channels, expected 1`);
        res.status(400).json({ error: 'Audio must be mono channel' });
        return;
      }

      if (sampleRate !== 16000) {
        logger.warn(`Audio file ${file.originalname} has sample rate ${sampleRate}, expected 16000`);
        res.status(400).json({ error: 'Sample rate must be exactly 16000 Hz' });
        return;
      }

      logger.info(`Audio file ${file.originalname} validated successfully`);
      next();
    }
  );
};