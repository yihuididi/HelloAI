export function getTrafficLightColor(score: number): string {
  if (score < 40) {
    return 'var(--color-red)';
  } else if (score < 55) {
    return 'var(--color-orange)';
  } else if (score < 70) {
    return 'var(--color-yellow)';
  } else if (score < 80) {
    return 'var(--color-green)';
  } else {
    return 'var(--color-teal)';
  }
}

export function getBlueColor(score: number): string {
  if (score < 40) {
    return 'var(--color-blue-darker)';
  } else if (score < 55) {
    return 'var(--color-blue-dark)';
  } else if (score < 70) {
    return 'var(--color-blue)';
  } else if (score < 80) {
    return 'var(--color-blue-light)';
  } else {
    return 'var(--color-blue-lighter)';
  }
}