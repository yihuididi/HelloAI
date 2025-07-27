import Content from './Content/Content';
import Fluency from './Fluency/Fluency';
import Intonation from './Intonation/Intonation';
import Overview from './Overview/Overview';
import Pronunciation from './Pronunciation/Pronunciation';
import styles from './Results.module.css';
import Sidebar from './Sidebar/Sidebar';
import { useEffect, useRef } from 'react';
import { RxCaretLeft } from 'react-icons/rx';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

function capitalize(str: string | null): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function Results() {
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const assessment = searchParams.get('assessment');
  const { recording_id } = useParams();

  useEffect(() => {
    // Set search params assessment=content by default
    if (!searchParams.has('assessment')) {
      searchParams.set('assessment', 'overview');
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      }, { replace: true });
    }

    // Validate search params
    const validAssessments = ['overview', 'content', 'pronunciation', 'intonation', 'fluency'];
    if (assessment && !validAssessments.includes(assessment)) {
      navigate('/404', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className={styles.layout}>
      <Sidebar assessment={assessment} />
      <div ref={contentRef} className={styles.contentWrapper}>
        <div className={styles.content}>
          <Link to='/recordings' className={styles.back}>
              <RxCaretLeft className={styles.icon} />
              Back to Recordings
          </Link>
          <div className={styles.heading}>{capitalize(assessment)}</div>
          {assessment === 'overview' ? <Overview />
            : assessment === 'content' ? <Content />
            : assessment === 'pronunciation' ? <Pronunciation containerRef={contentRef} />
            : assessment === 'intonation' ? <Intonation containerRef={contentRef} />
            : assessment === 'fluency' ? <Fluency containerRef={contentRef} />
            : <></>
          }
        </div>
      </div>
    </div>
  );
}

export default Results;