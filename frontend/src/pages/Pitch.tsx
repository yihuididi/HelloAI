import React, { useRef, useState, useEffect } from 'react';
import styles from './Pitch.module.css';
import { FaMicrophone } from 'react-icons/fa';

// Speech recognition setup
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const ANIMATION_DURATION = 1000;
const INITIAL_TIME = 5 * 60; // 5 minutes in seconds

function Transcript({ transcript }: { transcript: string }) {
  return (
    <div className={styles.transcriptPage}>
      <h2 className={styles.transcriptTitle}>Transcript</h2>
      <div className={styles.transcriptContent}>
        {transcript ? (
          <p>{transcript}</p>
        ) : (
          <p>No speech was detected during your pitch.</p>
        )}
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
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [recentWords, setRecentWords] = useState<string[]>([]);
  const [wordCounter, setWordCounter] = useState(0);
  const MAX_WORDS = 5;
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
      startSpeechRecognition();
    }, ANIMATION_DURATION);
  };

  const handleEndPitch = () => {
    setTimerActive(false);
    stopMic();
    stopSpeechRecognition();
    setShowCongrats(true);
  };

  // Timer countdown effect
  useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) {
      setTimerActive(false);
      stopMic();
      stopSpeechRecognition();
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

  // Speech recognition functions
  const startSpeechRecognition = () => {
    if (!recognition) {
      console.error('Speech recognition not supported in this browser');
      return;
    }
    
    console.log('Starting speech recognition...');
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
    };
    
    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      
      if (finalTranscript) {
        console.log('Final transcript received:', finalTranscript);
        setTranscript(prev => {
          const newTranscript = prev + finalTranscript;
          console.log('Current transcript:', newTranscript);
          return newTranscript;
        });
        
        // Update recent words with animation
        const words = finalTranscript.trim().split(/\s+/);
        console.log('Words to add:', words);
        setRecentWords(prev => {
          const newWords = [...prev, ...words];
          const result = newWords.slice(-MAX_WORDS);
          console.log('Updated recent words:', result);
          return result;
        });
        setWordCounter(prev => prev + words.length);
      }
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
      // Restart if still in timer mode
      if (timerActive) {
        recognition.start();
      }
    };
    
    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
    }
  };
  
  const stopSpeechRecognition = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const truncateWord = (word: string, maxLength: number = 8) => {
    if (word.length <= maxLength) return word;
    return word.substring(0, maxLength) + '...';
  };

  const handleContinueToTranscript = () => {
    setShowCongrats(false);
    setShowTranscript(true);
    // Here you would typically send the transcript to your backend
    console.log('Final transcript to send to backend:', transcript);
    // Example: sendTranscriptToBackend(transcript);
  };

  if (showTranscript) {
    return <Transcript transcript={transcript} />;
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
            {isListening && (
              <div className={styles.listeningIndicator}>
                <div className={styles.listeningDot}></div>
                <div className={styles.listeningDot}></div>
                <div className={styles.listeningDot}></div>
              </div>
            )}
          </div>
          <div className={styles.endPitchFixed}>
            <div className={styles.recentWordsBox}>
              <div className={styles.recentWordsTitle}>Recent Words</div>
              <div className={styles.recentWordsContainer}>
                {Array.from({ length: MAX_WORDS }, (_, index) => (
                  <div key={`position-${index}`} className={styles.wordPosition}>
                    {recentWords[index] && (
                      <span 
                        key={`${recentWords[index]}-${wordCounter}-${index}`} 
                        className={styles.recentWord}
                        style={{ animationDelay: `${index * 0.05}s` }}
                        title={recentWords[index]}
                      >
                        {truncateWord(recentWords[index])}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {recentWords.length === 0 && (
                <div className={styles.noWordsMessage}>No words detected yet...</div>
              )}
            </div>
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