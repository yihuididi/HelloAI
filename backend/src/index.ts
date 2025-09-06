import config from './config/config.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import qnaRoutes from './routes/qna.routes.js';
import recordingRoutes from './routes/recording.routes.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = config.PORT

app.use(cors({
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/qna', qnaRoutes);
app.use('/api/user', userRoutes);
app.use('/api/recording', recordingRoutes);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log('Server started at http://localhost:' + PORT);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
});