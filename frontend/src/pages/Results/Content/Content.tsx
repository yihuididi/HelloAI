import useIsMobile from '../../../hooks/useIsMobile';
import styles from '../Layout.module.css';
import Transcript from '../Transcript/Transcript';
import tstyles from '../Transcript/Transcript.module.css';
import { FiExternalLink } from 'react-icons/fi';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip
} from 'recharts';

const data = {
  score: [
    { metric: 'Clarity', score: 3 },
    { metric: 'Relevance', score: 4 },
    { metric: 'Depth', score: 2 },
    { metric: 'Neutrality', score: 4 },
    { metric: 'Engagement', score: 5 },
  ],
  pitch: {
    clarity: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    relevance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    depth: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    neutrality: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    engagement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  qna: {
    assessment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    improvement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    sources: [
      { title: 'Link Title Goes Here', link: '/' },
      { title: 'Link Title Goes Here', link: '/' },
      { title: 'Link Title Goes Here', link: '/' }
    ]
  },
  transcript: {
    pitch: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    qna: [
      {
        question: 'Question 1 goes here',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        question: 'Question 2 goes here',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        question: 'Question 3 goes here',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
    ]
  }
};

function Content() {
  const isMobile = useIsMobile();

  return (
    <>
      <div className={`${styles.container} ${styles.score}`}>
        <RadarChart
          width={isMobile ? 300 : 700}
          height={isMobile ? 220 : 320}
          data={data.score}
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fontSize: isMobile ? '.7rem' : '1rem' }}
          />
          <PolarRadiusAxis
            angle={18}
            domain={[1, 5]}
            tick={{ fontSize: isMobile ? '.6rem' : '.9rem' }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </div>

      <div className={styles.container}>
        <h1>Pitch</h1>
        <div className={styles.container}>
          <h2>Clarity</h2>
          <div>{data.pitch.clarity}</div>
        </div>
        <div className={styles.container}>
          <h2>Relevance</h2>
          <div>{data.pitch.relevance}</div>
        </div>
        <div className={styles.container}>
          <h2>Depth</h2>
          <div>{data.pitch.depth}</div>
        </div>
        <div className={styles.container}>
          <h2>Neutrality</h2>
          <div>{data.pitch.neutrality}</div>
        </div>
        <div className={styles.container}>
          <h2>Engagement</h2>
          <div>{data.pitch.engagement}</div>
        </div>
      </div>

      <div className={styles.container}>
        <h1>QnA</h1>
        <div className={styles.container}>
          <h2>Assessment</h2>
          <div>{data.qna.assessment}</div>
        </div>
        <div className={styles.container}>
          <h2>Areas for Improvement</h2>
          <div>{data.qna.improvement}</div>
        </div>
        <div className={styles.container}>
          <h2>Recommended Sources</h2>
          <ul>
            {data.qna.sources.map((source, i) => (
              <li key={i}>
                <a
                  className={styles.link}
                  href={source.link}
                  target='_blank'
                >
                  <FiExternalLink /> {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.container}>
        <Transcript>
          <div className={tstyles.pane1}>
            <div className={tstyles.header}>Transcript</div>
            {data.transcript.pitch}
          </div>
          <div className={tstyles.pane2}>
            <div className={tstyles.header}>QnA</div>
            {data.transcript.qna.map((qna, i) => (
              <div className={tstyles.box} key={i}>
                <strong>{qna.question}</strong>
                <div>{qna.answer}</div>
              </div>
            ))}
          </div>
        </Transcript>
      </div>
    </>
  );
}

export default Content;