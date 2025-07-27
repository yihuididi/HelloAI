import styles from './Speedometer.module.css';
import React, { useEffect, useState } from 'react';

const getNeedleAngle = (wpm: number) => {
  const clamped = Math.min(Math.max(wpm, 50), 250);
  return ((clamped - 50) / 200) * 180 - 90;
}

interface Props {
  value: number;
  description: string;
  guageThickness?: string;
  needleThickness?: string;
  unit?: string;
  diameter?: string;
  valueFontSize?: string;
  labelFontSize?: string;
  animation?: boolean;
}

function Speedometer({
  value,
  description,
  guageThickness = '12%',
  needleThickness = '2px',
  unit,
  diameter = '180px',
  valueFontSize = '1rem',
  labelFontSize = '1rem',
  animation = true
}: Props) {
  const [angle, setAngle] = useState('-90deg');

  // Animate needle
  useEffect(() => {
    setAngle(`${getNeedleAngle(value)}deg`);
  }, [value]);

  return (
    <div
      className={styles.wrapper}
      style={{
        '--diam': diameter
      } as React.CSSProperties}
    >
      <div
        className={styles.speedometer}
        style={{
          '--thickness': guageThickness
        } as React.CSSProperties}
      >
        <div
          className={styles.needle}
          style={{
            '--angle': angle,
            '--thickness': needleThickness,
            '--transition': animation ? 'transform .6s ease' : 'none'
          } as React.CSSProperties }
        />
        <div className={styles.center}>
          <div
            className={styles.value}
            style={{
              '--font-size': valueFontSize
            } as React.CSSProperties}
          >
            {value} {unit}
          </div>
          <div
            className={styles.label}
            style={{
              '--font-size': labelFontSize
            } as React.CSSProperties}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Speedometer;