import Features from '../../components/Features/Features';
import Intro from '../../components/Intro/Intro';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <Intro />
      <Features />
    </div>
  )
}

export default Home;