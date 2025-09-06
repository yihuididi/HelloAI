import type { Title } from '../../../shared/types/recording.js';

export const getTitle = (score: number): Title => {
  if (score < 40) {
    return 'Beginner';
  } else if (score < 55) {
    return 'Elementary';
  } else if (score < 70) {
    return 'Intermediate';
  } else if (score < 85) {
    return 'Advanced';
  } else {
    return 'Fluent';
  }
};