import Features from './Features/Features';
import styles from './Home.module.css';
import Intro from './Intro/Intro';

function Home() {
  return (
    <div className={styles.home}>
      <Intro />
      <Features />
    </div>
  )
}

export default Home;