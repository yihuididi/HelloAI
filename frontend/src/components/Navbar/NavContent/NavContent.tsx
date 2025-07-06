import useIsMobile from '../../../hooks/useIsMobile';
import { logout } from '../../../services/auth';
import { useAuthStore } from '../../../store/auth';
import styles from './NavContent.module.css';
import Profile from './Profile/Profile';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

interface Props {
  isLoading: boolean;
}

function NavContent({ isLoading }: Props) {
  const isMobile = useIsMobile();
  const { email, isAuthenticated, username } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <div className={styles.content}>
      {isMobile ? (
        <>
          <button
            className={styles.menuIconContainer}
            onClick={() => setMenuOpen(prev => !prev)}
          >
            <span className={styles.menuIcon}>
              <span className={styles.top} />
              <span className={styles.middle} />
              <span className={styles.bottom} />
            </span>
          </button>

          {createPortal(
            <div className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
              <div className={`${styles.menuContainer} ${menuOpen ? '' : styles.up}`}>
                {isLoading ? (
                  <></>
                ) : (
                  <>
                    <div className={styles.menuBody}>
                      {!isAuthenticated && (
                        <>
                          <Link className={styles.menuItem} to='/register'>Register</Link>
                          <Link className={styles.menuItem} to='/login'>Login</Link>
                        </>
                      )}
                    </div>

                    {isAuthenticated && (
                      <div className={styles.profile}>
                        <button
                          className={styles.logout}
                          onClick={handleLogout}
                        >
                          Log out
                        </button>
                        <div>{username}</div>
                        <div>{email}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>,
            document.body
          )}
        </>
      ) : (
        <>
          {isLoading ? (
            <></>
          ) : isAuthenticated ? (
            <Profile />
          ) : (
            <>
              <Link className={styles.navItem} to='/register'>Register</Link>
              <Link className={styles.navItem} to='/login'>Login</Link>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default NavContent;