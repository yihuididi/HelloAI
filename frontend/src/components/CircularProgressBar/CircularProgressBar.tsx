import styles from './CircularProgressBar.module.css';
import { useEffect, useRef } from 'react';

interface Props {
  value: number;
  description: string;
  color?: string;
  fontSize?: string;
  diameter?: string;
  thickness?: string;
  fontColor?: string;
  animation?: boolean;
}

function CircularProgressBar({
  value,
  description,
  color = 'var(--color-green)',
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
        '--clr': color,
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