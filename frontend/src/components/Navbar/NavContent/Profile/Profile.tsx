import { logout } from '../../../../services/auth';
import { useAuthStore } from '../../../../store/auth';
import styles from './Profile.module.css';
import { useLayoutEffect, useRef, useState } from 'react';

function Profile() {
  const { email, username } = useAuthStore();
  const [isHidden, setIsHidden] = useState(true);

  // Handle responsive display name
  const displayName = username;
  const usernameRef = useRef<HTMLSpanElement>(null);
  const [isLongName, setIsLongName] = useState(false);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      const el = usernameRef.current;
      if (el) {
        setIsLongName(el.scrollWidth > el.clientWidth);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [displayName]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={() => setIsHidden(prev => !prev)} className={styles.profile}>
        <span
          ref={usernameRef}
          className={`${styles.displayName} ${isLongName ? styles.long : ''}`}
        >
          {displayName}
        </span>
        <span>▼</span>
      </div>

      <div className={`${styles.container} ${isHidden ? styles.hidden : ''}`}>
        <div className={styles.header}>
          <img src='/helloai_logo_white.png' alt='HelloAI logo' />
          <div className={styles.username}>{username}</div>
          <div className={styles.email}>{email}</div>
          <button className={styles.manage}>Manage your account</button>
        </div>
        <div className={styles.content}></div>
        <div className={styles.footer}>
          <button onClick={handleLogout} className={styles.item}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;