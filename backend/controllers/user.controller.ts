import { User as IUser } from '../../shared/types/user.js';
import User from '../models/user.model.js';
import { AuthRequest } from '../types/authRequest.js';
import { Request, Response } from 'express';

export const getMe = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById((req as AuthRequest).userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userData: IUser = {
      userId: user._id.toString(),
      email: user.email,
      username: user.username
    };
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};