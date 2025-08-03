import { AuthRequest } from '../types/authRequest.js';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  userId: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.AUTH_TOKEN;
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    (req as AuthRequest).userId = decoded.userId;
    next();
  } catch (err) {
    console.error('Error authenticating user:', err);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};