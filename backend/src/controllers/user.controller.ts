import { User as IUser } from '../../../shared/types/user.js';
import logger from '../config/logger.js';
import Recording from '../models/recording.model.js';
import User from '../models/user.model.js';
import { AuthRequest } from '../types/authRequest.js';
import { Request, Response } from 'express';

export const getMe = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req as AuthRequest;
    logger.info(`Fetching user profile for userId=${userId}`);

    const user = await User.findById(userId);
    if (!user) {
      logger.warn(`User not found: userId=${userId}`);
      return res.status(404).json({ error: 'User not found' });
    }

    const userData: IUser = {
      userId: user._id.toString(),
      email: user.email,
      username: user.username,
    };

    logger.info(`Successfully fetched profile for userId=${userId}`);
    res.status(200).json(userData);
  } catch (err) {
    logger.error(`Error getting user profile: ${err}`);
    res.status(500).json({ error: 'Error getting user' });
  }
};

export const getRecordings = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req as AuthRequest;
    logger.info(`Fetching recordings for userId=${userId}`);

    const user = await User.findById(userId);
    if (!user) {
      logger.warn(`User not found when fetching recordings: userId=${userId}`);
      return res.status(404).json({ error: 'User not found' });
    }

    const recordings = await Recording.find({ userId: user._id })
      .select('name audioLength score transcript createdAt');

    logger.info(`Found ${recordings.length} recordings for userId=${userId}`);
    res.status(200).json(recordings);
  } catch (err) {
    logger.error(`Error getting recordings: ${err}`);
    res.status(500).json({ error: 'Error getting recordings' });
  }
};