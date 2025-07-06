import styles from './AuthLayout.module.css';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className={styles.background}>
      <Link to='/' className={styles.brand}>
        <img className='brand-logo' src='helloai_logo_neon_nofill.png' alt='HelloAI logo' />
        <div>HelloAI</div>
      </Link>
      <div className={styles.blueBlob} />
      <div className={styles.purpleBlob} />
      <div className={styles.centerGlow}>
        <div className={styles.centerGlowInner} />
      </div>
      <div className={styles.dot1} />
      <div className={styles.dot2} />
      <div className={styles.dot3} />
      <div className={styles.dot4} />
      <div className={styles.dot5} />

      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout;