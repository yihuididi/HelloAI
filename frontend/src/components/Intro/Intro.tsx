import styles from './Intro.module.css';
import { BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Intro() {
  return (
    <>
      <h1 className={styles.h1}>An interactive AI<br/>startup interviewer</h1>
      <h3 className={styles.h3}>HelloAI is specially designed for students<br/>of EG4301 to practise their startup pitch.</h3>
      <div className={styles.buttons}>
        <Link
          className={styles.start}
          to='/pitch'
        >
          Get started
        </Link>
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