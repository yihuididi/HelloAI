import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import qnaRoutes from './routes/qna.routes.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/qna', qnaRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log('Server started at http://localhost:' + PORT);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
});