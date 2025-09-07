import config from '../config/config.js';
import logger from '../config/logger.js';
import { AuthRequest } from '../types/authRequest.js';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  userId: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.AUTH_TOKEN;

  if (!token) {
    logger.warn('Unauthorized access attempt: no token provided');
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as TokenPayload;
    (req as AuthRequest).userId = decoded.userId;
    logger.info(`Token authenticated successfully for userId=${decoded.userId}`);
    next();
  } catch (err) {
    logger.error('Error authenticating user token:', err);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};