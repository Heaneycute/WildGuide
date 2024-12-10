import React, { useEffect, useState } from "react";
import Dashboard from "./DashboardPage";
import styles from "../Styles/HomePage.module.css";

const HomePage: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    setScrollTop(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <header className={styles.mainHeader}>
          <div className={styles.layers}>
            <div
              className={styles.layer__header}
              style={{
                transform: `translate3d(0, ${scrollTop / 2}px, 0)`,
              }}
            >
              <div className={styles.layers__caption}>
                Добро пожаловать на Wild Guide
              </div>
              <div className={styles.layers__title}>Сообщество охотников</div>
            </div>
            <div
              className={`${styles.layer} ${styles.layers__base}`}
              style={{
                backgroundImage: "url(/img/layer-base.png)",
                transform: `translate3d(0, ${scrollTop / 1.6}px, 0)`,
              }}
            ></div>
            <div
              className={`${styles.layer} ${styles.layers__middle}`}
              style={{
                backgroundImage: "url(/img/layer-middle.png)",
                transform: `translate3d(0, ${scrollTop / 2.5}px, 0)`,
              }}
            ></div>
            <div
              className={`${styles.layer} ${styles.layers__front}`}
              style={{
                backgroundImage: "url(/img/layer-front.png)",
                transform: `translate3d(0, ${scrollTop / 5.7}px, 0)`,
              }}
            ></div>
          </div>
        </header>

        <article
          className={styles.mainArticle}
          style={{
            backgroundImage: "url(/img/dungeon.png)",
          }}
        >
          <div className={styles.mainArticleContent}>
            <h2 className={styles.mainArticleHeader}>Заголовок</h2>
            <p className={styles.mainArticleParagraph}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
              error provident dignissimos facere. Repellendus tempore autem qui!
              Quia magnam tempora esse id necessitatibus corrupti mollitia
              expedita sapiente cum rerum, ut dicta laboriosam!
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default HomePage;
