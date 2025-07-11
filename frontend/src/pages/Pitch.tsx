import React, { useRef, useState, useEffect } from 'react';
import styles from './Pitch.module.css';
import { FaMicrophone } from 'react-icons/fa';

const ANIMATION_DURATION = 1000;
const INITIAL_TIME = 5 * 60; // 5 minutes in seconds

function Transcript() {
  return (
    <div className={styles.transcriptPage}>
      <h2 className={styles.transcriptTitle}>Transcript</h2>
      <div className={styles.transcriptContent}>
        <p>This is where your pitch transcript will appear.</p>
      </div>
    </div>
  );
}

const Pitch: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [blurOut, setBlurOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [timerActive, setTimerActive] = useState(false);
  const [micPulse, setMicPulse] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const handleOk = () => {
    setBlurOut(true);
    setTimeout(() => {
      setLoading(true);
      setTimerActive(true);
    }, ANIMATION_DURATION);
  };

  const handleEndPitch = () => {
    setTimerActive(false);
    stopMic();
    setShowCongrats(true);
  };

  // Timer countdown effect
  useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) {
      setTimerActive(false);
      stopMic();
      setShowCongrats(true);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Microphone pulse effect
  useEffect(() => {
    if (!loading) return;
    let stopped = false;
    let stream: MediaStream;
    async function startMic() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;
        const source = audioContext.createMediaStreamSource(stream);
        sourceRef.current = source;
        source.connect(analyser);
        const dataArray = new Uint8Array(analyser.fftSize);
        function animate() {
          if (stopped) return;
          analyser.getByteTimeDomainData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            const val = (dataArray[i] - 128) / 128;
            sum += val * val;
          }
          const rms = Math.sqrt(sum / dataArray.length);
          setMicPulse(1 + Math.min(rms * 2.5, 0.5));
          animationFrameRef.current = requestAnimationFrame(animate);
        }
        animate();
      } catch (err) {
        setMicPulse(1);
      }
    }
    startMic();
    return () => {
      stopped = true;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [loading]);

  function stopMic() {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    setMicPulse(1);
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleContinueToTranscript = () => {
    setShowCongrats(false);
    setShowTranscript(true);
  };

  if (showTranscript) {
    return <Transcript />;
  }

  if (showCongrats) {
    return (
      <div className={styles.congratsOverlay}>
        <div className={styles.congratsPopup}>
          <h2 className={styles.congratsTitle}>Good Job on your pitch! 🎉</h2>
          <p className={styles.congratsMessage}>Let us analyse and review your results!</p>
          <button className={styles.congratsButton} onClick={handleContinueToTranscript}>
            <span>Continue</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pitchContainer}>
      {!loading && (
        <div
          className={styles.centerBox + (blurOut ? ' ' + styles.blurOut : '')}
          ref={boxRef}
        >
          <div className={styles.text}>
            You will have 5 minutes to give a pitch followed by a 10 minute QNA
          </div>
          <button className={styles.okButton} onClick={handleOk}><span>OK</span></button>
        </div>
      )}
      {loading && (
        <>
          <div className={styles.loaderCircleWrapper}>
            <div
              className={styles.loaderCircle}
              style={{ transform: `scale(${micPulse})` }}
            >
              <FaMicrophone className={styles.micIcon} />
            </div>
          </div>
          <div className={styles.endPitchFixed}>
            <div className={styles.timerDisplay}>
              Time Left: {formatTime(timeLeft)}
            </div>
            <button className={styles.endPitchButton} onClick={handleEndPitch}>
              <span>End Pitch</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pitch; 