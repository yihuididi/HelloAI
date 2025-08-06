import { RecordingDocument } from '../models/recording.model.js';
import { AuthRequest } from './authRequest.js';

export interface RecordingRequest extends AuthRequest {
  recording: RecordingDocument;
}