import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; 
import "swiper/css/autoplay";
import axiosInstance from "../axiosInstance";
import styles from "../Styles/Weapon.module.css";
import Weapon3dModel from "../components/WeaponComponents/Weapon3dModel"; 

const getWeapons = async () => {
  const response = await axiosInstance.get("/api/v1/weapons");
  return response.data;
};

interface Weapon {
  id: number;
  model: string;
  description: string;
  model_link: string;
  img_link: string;
}

const WeaponGalleryPage: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeapons()
      .then((data) => {
        setWeapons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  const handleWeaponClick = (weapon: Weapon) => {
    setSelectedWeapon(weapon); 
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentContainer}>
        {selectedWeapon && (
          <div className={styles.detailsContainer}>
            <h2>Подробности об оружии: {selectedWeapon.model}</h2>
            <p>{selectedWeapon.description}</p>
            <p><strong>Модель:</strong> {selectedWeapon.model}</p>
            <div className={styles.modelLink}>
              <a href={selectedWeapon.model_link} target="_blank" rel="noopener noreferrer">
                Ссылка на 3D модель
              </a>
            </div>
          </div>
        )}

        {selectedWeapon && selectedWeapon.model_link && (
          <div className={styles.modelContainer}>
            <Weapon3dModel key={selectedWeapon.id} modelLink={selectedWeapon.model_link} />
          </div>
        )}
      </div>

      <div className={styles.sliderContainer}>
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true} 
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {weapons.map((weapon) => (
            <SwiperSlide key={weapon.id} className={styles.slide}>
              <div
                onClick={() => handleWeaponClick(weapon)}
                className={styles.item}
              >
                <div
                  className={styles.imageWrapper}
                  style={{
                    backgroundImage: `url(${weapon.img_link})`,
                  }}
                ></div>
                <p>{weapon.model}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default WeaponGalleryPage;