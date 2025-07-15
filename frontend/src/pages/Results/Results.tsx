import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Results.module.css';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const assessment = searchParams.get('assessment');
  const { recording_id } = useParams();

  // Set search params assessment=content by default
  useEffect(() => {
    if (!searchParams.has('assessment')) {
      searchParams.set('assessment', 'content');
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      }, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className={styles.layout}>
      <Sidebar assessment={assessment} />
      test
    </div>
  );
}

export default Results;