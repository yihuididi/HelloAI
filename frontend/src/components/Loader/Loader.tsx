import styles from './Loader.module.css';

interface LoaderProps {
  theme: 'light' | 'dark';
}

function Loader({ theme }: LoaderProps) {
  return (
    <div className={styles.wrapper}>
      <span className={`${styles.loader} ${theme}`} />
    </div>
  );
}

export default Loader;