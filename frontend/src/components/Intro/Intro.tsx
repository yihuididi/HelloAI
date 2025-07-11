import styles from './Intro.module.css';
import { BsGithub } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Intro() {
  const navigate = useNavigate();
  const [blurOut, setBlurOut] = useState(false);

  const handleGetStarted = () => {
    setBlurOut(true);
    setTimeout(() => {
      navigate('/pitch');
    }, 1000); // Match blur animation duration
  };

  return (
    <>
      <h1 className={styles.h1 + (blurOut ? ' ' + styles.blurOut : '')}>AI-Powered<br/>Pitch Trainer</h1>
      <h3 className={styles.h3 + (blurOut ? ' ' + styles.blurOut : '')}>HelloAI helps EG4301 students sharpen their startup pitches through interactive mock interviews</h3>
      <div className={styles.buttons + (blurOut ? ' ' + styles.blurOut : '')}>
        <button
          className={styles.start}
          onClick={handleGetStarted}
        >
          Get started
        </button>
        <a
          className={styles.github}
          href='https://github.com/yihuididi/HelloAI'
          target='_blank'
        >
          <BsGithub className={styles.githubLogo} />
          Github
        </a>
      </div>
    </>
  );
}

export default Intro;