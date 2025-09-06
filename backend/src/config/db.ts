import config from '../config/config.js';
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB connected:', conn.connection.host);
  } catch (err: any) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};