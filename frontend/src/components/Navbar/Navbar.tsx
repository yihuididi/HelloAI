import { getUserIfLoggedIn } from '../../services/user';
import { useAuthStore } from '../../store/auth';
import NavContent from './NavContent/NavContent';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const { logout, setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserIfLoggedIn();
      if (user) {
        setAuth({ userId: user.userId, email: user.email, username: user.username });
      } else {
        logout();
      }
    };

    (async () => {
      await fetchUser();
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className={styles.navbar}>
      <Link to='/' className={styles.brand}>
        <img className='brand-logo' src='/helloai_logo_white.png' alt='HelloAI logo' />
        <span>HelloAI</span>
      </Link>
      
      <NavContent isLoading={isLoading}/>
    </div>
  )
}

export default Navbar;