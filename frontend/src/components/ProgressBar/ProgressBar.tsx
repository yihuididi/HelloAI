import styles from './ProgressBar.module.css';
import React, { useEffect, useState } from 'react';

interface Props {
  value: number;
  color?: string;
  fontSize?: string;
  fontColor?: string;
  thickness?: string;
  length?: string;
  animation?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

function ProgressBar({
  value,
  color = 'var(--color-green)',
  fontSize = '.8rem',
  fontColor = 'var(--color-gray-darkest)',
  thickness = '6px',
  length = '180px',
  animation = true,
  orientation = 'horizontal',
}: Props) {
  const [width, setWidth] = useState('0%');
  const isVertical = orientation === 'vertical';

  // Animate progress bar
  useEffect(() => {
    setWidth(`${value}%`);
  }, [value]);

  return (
    <div
      className={`${styles.container} ${isVertical ? styles.vertical : styles.horizontal}`}
      style={{
        '--length': length
      } as React.CSSProperties}
    >
      <span
        className={styles.score}
        style={{
          '--font-size': fontSize,
          '--font-color': fontColor
        } as React.CSSProperties}
      >
        {value}
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
            '--progress': width,
            '--clr': color,
            '--transition': animation
              ? isVertical
                ? 'height .8s ease'
                : 'width .8s ease'
              : 'none'
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

export default ProgressBar;