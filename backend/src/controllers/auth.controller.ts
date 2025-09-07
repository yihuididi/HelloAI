import { loginSchema, registerSchema } from '../../../shared/authValidation.js'
import { User as IUser } from '../../../shared/types/user.js';
import config from '../config/config.js';
import logger from '../config/logger.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<any> => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    logger.warn('Register validation failed', { issues: parsed.error.issues });
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  const { email, username, password } = parsed.data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Register attempt failed: user already exists - ${email}`);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword
    });

    logger.info(`User registered successfully: ${email}`);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    logger.error('Error registering user:', err);
    return res.status(500).json({ error: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    logger.warn('Login validation failed', { issues: parsed.error.issues });
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  const { email, password } = parsed.data;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed: invalid credentials - ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: invalid credentials - ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '7d' });

    const userData: IUser = {
      userId: user._id.toString(),
      email: user.email,
      username: user.username
    };

    logger.info(`User logged in successfully: ${email}`);
    return res
      .cookie('AUTH_TOKEN', token, {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .status(200)
      .json(userData);
  } catch (err) {
    logger.error('Error authenticating user:', err);
    return res.status(500).json({ error: 'Error authenticating user' });
  }
};

export const logout = (req: Request, res: Response): void => {
  logger.info('User logged out');
  res
    .clearCookie('AUTH_TOKEN', {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    .status(200)
    .json({ message: 'Logged out successfully' });
};

export const checkAuth = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.cookies.AUTH_TOKEN;
    if (!token) {
      logger.info('Auth check: not authenticated (no token)');
      return res.status(200).json({ authenticated: false });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId);
    if (!user) {
      logger.info(`Auth check: not authenticated (user not found) userId=${decoded.userId}`);
      return res.status(200).json({ authenticated: false });
    }

    logger.info(`Auth check: authenticated userId=${decoded.userId}`);
    return res.status(200).json({ authenticated: true });
  } catch (err) {
    logger.error('Auth check error:', err);
    return res.status(200).json({ authenticated: false });
  }
};