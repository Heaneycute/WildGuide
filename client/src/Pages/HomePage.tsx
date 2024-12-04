import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../Styles/HomePage.module.css';

const HomePage: React.FC = () => {
  const { scrollY } = useScroll();

  const baseY = useTransform(scrollY, [0, 1000], [0, 100]);
  const middleY = useTransform(scrollY, [0, 1000], [0, 200]);
  const frontY = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.mainHeader}>
          <h1 className={styles.layersTitle}>Wild Guide</h1>
      </header>
      
      <div className={styles.layers}>
        <motion.div
          className={`${styles.layer} ${styles.layersBase}`}
          style={{
            backgroundImage: 'url(../img/layer-base.png)',
            y: baseY,
          }}
        />
        <motion.div
          className={`${styles.layer} ${styles.layersMiddle}`}
          style={{
            backgroundImage: 'url(../img/layer-middle.png)',
            y: middleY,
          }}
        />
        <motion.div
          className={`${styles.layer} ${styles.layersFront}`}
          style={{
            backgroundImage: 'url(../img/layer-front.png)',
            y: frontY,
          }}
        />
      </div>

        
        <div className={styles.layers}>
        <h2>Welcome to the Map</h2>
        <motion.div
          className={`${styles.layer} ${styles.dungeon}`}
          style={{
            backgroundImage: 'url(../img/dungeon.png)',
            y: baseY,
          }}
        />
        </div>
    </div>
  );
};

export default HomePage;
