import useIsMobile from '../../hooks/useIsMobile';
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar';
import styles from './Overview.module.css';

function Overview() {
  const isMobile = useIsMobile();

  return (
    <>
      <div className={styles.score}>
        <CircularProgressBar
          value={15}
          color='var(--color-green)'
          description='Intermediate'
          diameter={isMobile ? '150px' : '200px'}
          thickness={isMobile ? '8px' : '11px'}
          fontSize={isMobile ? '1rem' : '1.25rem'}
        />
      </div>
    </>
  );
}

export default Overview;