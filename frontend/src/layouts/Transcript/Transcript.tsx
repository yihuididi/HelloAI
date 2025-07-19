import AudioPlayer from './AudioPlayer/AudioPlayer';
import styles from './Transcript.module.css';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Transcript({ children }: Props) {
  return (
    <div className={styles.container}>
      <AudioPlayer />
      <div className={styles.transcript}>
        <div className={styles.header}>
          Transcript
        </div>
        {children}
      </div>
    </div>
  );
}

export default Transcript;