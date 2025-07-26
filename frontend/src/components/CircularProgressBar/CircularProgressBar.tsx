import styles from './CircularProgressBar.module.css';
import { useEffect, useRef } from 'react';

type Description = 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced' | 'Fluent';

interface Props {
  value: number;
  description: Description;
  fontSize?: string;
  diameter?: string;
  thickness?: string;
  fontColor?: string;
  animation?: boolean;
}

function getColor(description: Description): string {
  switch (description) {
    case 'Beginner':
      return '#ef4444';
    case 'Elementary':
      return '#f97316';
    case 'Intermediate':
      return '#eab308';
    case 'Advanced':
      return '#22c55e';
    case 'Fluent':
      return '#22bac5';
    default:
      return '';
  }
}

function CircularProgressBar({
  value,
  description,
  fontSize = '1rem',
  diameter = '130px',
  thickness = '8px',
  fontColor = 'inherit',
  animation = true
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

    // Animate progress meter
    useEffect(() => {
      if (animation) {
        const duration = 300;
        const el = ref.current;
        if (!el) return;

        let start: number | null = null;

        const animate = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const currentValue = Math.round(progress * value);

          el.style.setProperty('--i', currentValue.toString());
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      }
    }, [value, animation]);

  return (
    <div
      className={styles.progress}
      ref={ref}
      style={{
        '--i': value,
        '--clr': getColor(description),
        '--diam': diameter,
        '--thickness': thickness
      } as React.CSSProperties }
    >
      <div
        className={styles.text}
        style={{
          '--font-color': fontColor
        } as React.CSSProperties}
      >
        <div className={styles.value}>{`${value.toFixed(0)}%`}</div>
        <div
          className={styles.description}
          style={{ '--font-size': fontSize } as React.CSSProperties}
        >{description}</div>
      </div>
    </div>
  );
}

export default CircularProgressBar;