import type { Result, Statuses } from '../../../shared/types/recording.js';
import mongoose from 'mongoose';

export interface RecordingDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  r2Key?: string;
  audioLength?: number;
  score?: number;
  transcript?: string;
  result?: Result;
  status: Statuses;
}

const RecordingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  r2Key: { type: String },
  audioLength: { type: Number },
  score: { type: Number },
  transcript: { type: String },
  result: {
    overview: {
      score: Number,
      title: String,
      description: String,
      summary: String,
      improvement: String,
      transcript: String
    },
    content: {
      score: {
        clarity: Number,
        relevance: Number,
        depth: Number,
        neutrality: Number,
        engagement: Number
      },
      pitch: {
        clarity: String,
        relevance: String,
        depth: String,
        neutrality: String,
        engagement: String
      },
      qna: {
        assessment: String,
        improvement: String,
        sources: [{ title: String, link: String }]
      },
      transcript: {
        pitch: String,
        qna: [{ question: String, answer: String }]
      }
    },
    pronunciation: {
      score: Number,
      title: String,
      description: String,
      transcript: [{
        text: String,
        score: Number,
        phonemes: [{
          phoneme: String,
          score: Number,
          tip: String
        }]
      }]
    },
    intonation: {
      score: Number,
      title: String,
      description: String,
      pitch: [{ time: Number, pitch: Number }],
      transcript: [{
        text: String,
        expected: Boolean,
        actual: Boolean,
        tip: String
      }]
    },
    fluency: {
      score: Number,
      title: String,
      description: String,
      wpm: Number,
      speedLabel: String,
      pauseScore: Number,
      transcript: [{
        text: String,
        classification: String,
        tip: String
      }]
    }
  },
  status: {
    type: {
      overview: { type: String, required: true },
      content: { type: String, required: true },
      pronunciation: { type: String, required: true },
      intonation: { type: String, required: true },
      fluency: { type: String, required: true },
    },
    required: true
  }
}, {
  timestamps: true
});

RecordingSchema.index({ userId: 1, name: 1}, { unique: true });

export default mongoose.model<RecordingDocument>('Recording', RecordingSchema);