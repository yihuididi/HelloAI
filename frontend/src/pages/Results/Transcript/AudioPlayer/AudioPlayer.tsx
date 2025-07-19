import styles from './AudioPlayer.module.css';
import React, { useRef, useState, useEffect } from 'react';
import {
  RiForward10Fill,
  RiForward15Fill,
  RiForward30Fill,
  RiForward5Fill,
  RiPauseLargeFill,
  RiPlayLargeFill,
  RiReplay10Fill,
  RiReplay15Fill,
  RiReplay30Fill,
  RiReplay5Fill
} from 'react-icons/ri';

interface Props {
  jumpTime?: 5 | 10 | 15 | 30;
}

const forwardIcons = {
  5: RiForward5Fill,
  10: RiForward10Fill,
  15: RiForward15Fill,
  30: RiForward30Fill,
};

const replayIcons = {
  5: RiReplay5Fill,
  10: RiReplay10Fill,
  15: RiReplay15Fill,
  30: RiReplay30Fill,
};

function AudioPlayer({ jumpTime = 5 }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const ForwardIcon = forwardIcons[jumpTime];
  const ReplayIcon = replayIcons[jumpTime];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        Math.max(0, audioRef.current.currentTime + seconds),
        duration
      );
      setProgress(audioRef.current.currentTime);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return (
    <>
      <audio ref={audioRef} src="/concreteai_pitch.mp3" />
      <div className={styles.controls}>
        <button
          className={styles.jump}
          onClick={() => skipTime(-jumpTime)}
        >
          <ReplayIcon />
        </button>
        <button
          className={styles.play}
          onClick={togglePlay}
        >
          {isPlaying ? <RiPauseLargeFill /> : <RiPlayLargeFill />}
        </button>
        <button
          className={styles.jump}
          onClick={() => skipTime(jumpTime)}
        >
          <ForwardIcon />
        </button>
      </div>
      <input
        className={styles.slider}
        type="range"
        min={0}
        max={duration}
        value={progress}
        onChange={handleSeek}
        style={{ '--progress': `${(progress / duration) * 100}%` } as React.CSSProperties}
      />
      <div className={styles.time}>
        {formatTime(progress)} / {formatTime(duration)}
      </div>
    </>
  );
}

export default AudioPlayer;