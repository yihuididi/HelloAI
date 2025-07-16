import Content from '../../components/Content/Content';
import Fluency from '../../components/Fluency/Fluency';
import Intonation from '../../components/Intonation/Intonation';
import Overview from '../../components/Overview/Overview';
import Pronunciation from '../../components/Pronunciation/Pronunciation';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Results.module.css';
import { useEffect } from 'react';
import { RxCaretLeft } from 'react-icons/rx';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

function capitalize(str: string | null): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const assessment = searchParams.get('assessment');
  const { recording_id } = useParams();

  // Set search params assessment=content by default
  useEffect(() => {
    if (!searchParams.has('assessment')) {
      searchParams.set('assessment', 'overview');
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      }, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className={styles.layout}>
      <Sidebar assessment={assessment} />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <Link to='/recordings' className={styles.back}>
              <RxCaretLeft className={styles.icon} />
              Back to Recordings
          </Link>
          <div className={styles.heading}>{capitalize(assessment)}</div>
          {assessment === 'overview' ? <Overview />
            : assessment === 'content' ? <Content />
            : assessment === 'pronunciation' ? <Pronunciation />
            : assessment === 'intonation' ? <Intonation />
            : assessment === 'fluency' ? <Fluency />
            : <></>
          }
        </div>
      </div>
    </div>
  );
}

export default Results;