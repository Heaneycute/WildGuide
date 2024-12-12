import React, { useEffect, useState } from "react";
import styles from "../Styles/HomePage.module.css";
import { User } from '../types';
import { Container, Typography, Stack, Paper } from '@mui/material';


type NavbarProps = {
  user?: User;
};
const HomePage: React.FC = ({ user }: NavbarProps) => {
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
              {user && user.username ? `Привет, ${user.username}!` : 
              'Добро пожаловать!'
              } 
              </div>
              <div className={styles.layers__title}>ты на лучшем портале</div>
              <div className={styles.layers__title}>для охотников</div>
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
            <h2 className={styles.mainArticleHeader}>СОБЕРЕМСЯ НА ОХОТУ ВМЕСТЕ</h2>
            <p className={styles.mainArticleParagraph}>
            Удобное управление снаряжением при планировании охоты, не надо держать все в голове.
            </p>
            <p className={styles.mainArticleParagraph}>
            Интерактивные карты с актуальной информацией об охотничьих зонах, домиках и маршрутах с отзывами.
            </p>
            <p className={styles.mainArticleParagraph}>
            Инструмент для выбора оружия под конкретные зоны и тип добычи.
            </p>
            <p className={styles.mainArticleParagraph}>
            Отслеживание погодных условий и планирование событий.
            </p>
            <p className={styles.mainArticleParagraph}>
            Возможность делиться опытом и координировать охоту с другими участниками через систему чатов, форумов и личных сообщений. Создание групп охотников для совместных выездов и обмена информацией о местах охоты. 
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default HomePage;
