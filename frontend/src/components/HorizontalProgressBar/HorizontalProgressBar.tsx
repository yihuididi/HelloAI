import styles from './HorizontalProgressBar.module.css';
import React, { useEffect, useState } from 'react';

interface Props {
  score: number;
  fontSize?: string;
  fontColor?: string;
  thickness?: string;
  animation?: boolean;
}

function getColor(score: number): string {
  if (score < 40) {
    return '#ef4444';
  } else if (score < 55) {
    return '#f97316';
  } else if (score < 70) {
    return '#eab308';
  } else if (score < 80) {
    return '#22c55e';
  } else {
    return '#22bac5';
  }
}

function HorizontalProgressBar({
  score,
  fontSize = '.8rem',
  fontColor = 'var(--color-gray-darkest)',
  thickness = '6px',
  animation = true
}: Props) {
  const [width, setWidth] = useState('0%');

  // Animate progress bar
  useEffect(() => {
    setWidth(`${score}%`);
  }, [score]);

  return (
    <div className={styles.container}>
      <span
        className={styles.score}
        style={{
          '--font-size': fontSize,
          '--font-color': fontColor
        } as React.CSSProperties}
      >
        {score}
      </span>
      <div
        className={styles.bar}
        style={{
          '--thickness': thickness
        } as React.CSSProperties}
      >
        <div
          className={styles.fill}
          style={{
            width: width,
            backgroundColor: getColor(score),
            transition: animation ? 'width .8s' : 'none'
          }}
        />
      </div>
    </div>
  );
}

export default HorizontalProgressBar;