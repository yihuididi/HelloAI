export type Status = 'not_started' | 'pending' | 'done' | 'failed';

export interface Statuses {
  overview: Status;
  content: Status;
  pronunciation: Status;
  intonation: Status;
  fluency: Status;
}

export type Title = 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced' | 'Fluent';

export interface Overview {
  score: number;
  title: Title;
  description: string;
  summary: string;
  improvement: string;
  transcript: string;
}

export interface Content {
  score: {
    clarity: number,
    relevance: number,
    depth: number,
    neutrality: number,
    engagement: number
  },
  pitch: {
    clarity: string,
    relevance: string,
    depth: string,
    neutrality: string,
    engagement: string
  },
  qna: {
    assessment: string,
    improvement: string,
    sources: { title: string, link: string }[]
  },
  transcript: {
    pitch: string,
    qna: { question: string, answer: string }[]
  },
}

export interface PronunciationWord {
  text: string;
  score: number;
  phonemes: {
    phoneme: string;
    score: number;
    tip?: string;
  }[];
}

export interface PronunciationResult {
  score: number;
  title: Title;
  description: string;
  transcript: PronunciationWord[];
}

export interface Intonation {
  score: number;
  title: Title;
  description: string;
  pitch: { time: number; pitch: number }[];
  transcript: {
    text: string;
    expected: boolean;
    actual: boolean;
    tip?: string;
  }[];
}

export interface Fluency {
  score: number;
  title: Title;
  description: string;
  wpm: number;
  speedLabel: 'Slow' | 'Natural' | 'Fast';
  pauseScore: number;
  transcript: {
    text: string;
    classification: string;
    tip?: string;
  }[];
}

export interface Result {
  overview?: Overview;
  content?: Content;
  pronunciation?: PronunciationResult
  intonation?: Intonation;
  fluency?: Fluency;
}