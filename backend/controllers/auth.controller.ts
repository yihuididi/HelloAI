import { loginSchema, registerSchema } from '../../shared/authValidation.js';
import { User as IUser } from '../../shared/types/user.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<any> => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

  const { email, username, password } = parsed.data;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      username: username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

  const { email, password } = parsed.data;

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    const userData: IUser = {
      userId: user._id.toString(),
      email: user.email,
      username: user.username
    };

    res
      .cookie('AUTH_TOKEN', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .status(200)
      .json(userData);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err});
  }
};

export const logout = (req: Request, res: Response): void => {
  res
    .clearCookie('AUTH_TOKEN', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    .status(200)
    .json({ message: 'Logged out successfully' });
};

export const checkAuth = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.cookies.AUTH_TOKEN;
    if (!token) {
      return res.status(200).json({ authenticated: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(200).json({ authenticated: false });
    }

    res.status(200).json({ authenticated: true });
  } catch (err) {
    res.status(200).json({ authenticated: false });
  }
};