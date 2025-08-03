import { User as IUser } from '../../../shared/types/user.js';
import Recording from '../models/recording.model.js';
import User from '../models/user.model.js';
import { AuthRequest } from '../types/authRequest.js';
import { Request, Response } from 'express';

export const getMe = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById((req as AuthRequest).userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const userData: IUser = {
      userId: user._id.toString(),
      email: user.email,
      username: user.username
    };
    res.status(200).json(userData);
  } catch (err) {
    console.error('Error getting user:', err);
    res.status(500).json({ error: 'Error getting user' });
  }
};

export const getRecordings = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById((req as AuthRequest).userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const recordings = await Recording
      .find({ userId: user._id })
      .select('name audioLength score transcript createdAt');
    res.status(200).json(recordings);
  } catch (err) {
    console.error('Error getting recordings:', err);
    res.status(500).json({ error: 'Error getting recordings' });
  }
};