// middleware/validateAudio.ts
import { exec } from 'child_process';
import { NextFunction, Request, Response } from 'express';
import path from 'path';

const allowedMimeTypes = ['audio/wav', 'audio/x-wav', 'audio/wave'];

export const validateAudio = (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ error: 'No audio file uploaded.' });
  }

  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.wav') {
    return res.status(400).json({ error: 'Only .wav files are accepted' });
  }

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return res.status(400).json({ error: 'Invalid MIME type. Only wav audio is supported' });
  }

  const filepath = file.path

  // ffmpeg needs to be installed on machine first
  exec(
    `ffprobe -v error -select_streams a:0 -show_entries stream=sample_rate,channels -of default=noprint_wrappers=1 "${filepath}"`,
    (err, stdout, stderr) => {
      if (err) {
        console.error('ffprobe error:', stderr);
        return res.status(400).json({ error: 'Failed to analyze audio file.' });
      }

      const sampleRate = parseInt(stdout.match(/sample_rate=(\d+)/)?.[1] || '0', 10);
      const channels = parseInt(stdout.match(/channels=(\d+)/)?.[1] || '0', 10);

      if (channels !== 1) {
        return res.status(400).json({ error: 'Audio must be mono channel' });
      }

      if (sampleRate !== 16000) {
        return res.status(400).json({ error: 'Sample rate must be exactly 16000 Hz' });
      }

      next();
    }
  );
};