import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import {
  pageWrapperStyles,
  mainContentStyles,
  modelViewerStyles,
  weaponCardStyles,
  loadingContainerStyles,
  childrenColumnStyles,
  weaponInfoStyles,
  weaponCarouselStyles,
  upContentStyles,
} from "../Styles/WeaponPages.styles";
import Weapon3dModel from "../components/WeaponComponents/Weapon3dModel";

interface Weapon {
  id: number;
  model: string;
  description: string;
  law: string;
  model_link: string;
  img_link: string;
  characteristics?: {
    caliber?: string;
    weight?: string;
    length?: string;
    capacity?: string;
  };
}

const testWeapons: Weapon[] = [
  {
    id: 1,
    model: "Гладкоствольное оружие",
    description: "Гладкоствольное оружие представляет собой вид огнестрельного оружия с гладким стволом без нарезов. Это означает, что пуля не стабилизируются вращением, в отличие от нарезного. \r\n Наиболее распространенные типы патронов, используемых в ружьях содержат дробь, картечь или пулю.\r\n  Дробь используется для охоты на мелкую дичь и птиц, картечь — на крупную дичь, а пули — на дальние дистанции.  ",
    law:"Для приобретения и владения гладкоствольным оружием требуется: Получить лицензию на приобретение гладкоствольного оружия.Условия:Возраст от 18 лет.Пройти медицинскую комиссию, включая психиатра и нарколога.Пройти обучение правилам обращения с оружием и получить сертификат.Зарегистрировать сейф для хранения оружия.После покупки оружия необходимо оформить разрешение на хранение и ношение в течение 14 дней.",
    model_link: "/models/mossberg.glb",
    img_link: "/images/1.png",
    characteristics: {
      caliber: "12/70, 12/76 (магнум), 20/70, 20/76",
      weight:" 2,8–3,5 кг",
      length: "1000–1200 мм",
      capacity: "1-10",
    },
  }, {
    id: 1,
    model: "Нарезное оружие",
    description: " ",
    law:"Для нарезного оружия требования строже, чем для гладкоствольного:Сначала необходимо владеть гладкоствольным оружием не менее 5 лет и не иметь нарушений.Получить лицензию на приобретение нарезного оружия.После покупки также нужно оформить разрешение на хранение и ношение.",
    model_link: "/models/hunting_rifle.glb",
    img_link: "/images/1.png",
    characteristics: {
      caliber: "",
      weight:" ",
      length: "",
      capacity: "",
    },
  }, {
    id: 1,
    model: "Пневматическое оружие",
    description: "",
    law:"Для пневматического оружия с энергией выстрела до 7,5 Дж и калибром до 4,5 мм (например, спортивные и развлекательные модели) разрешение не требуется.Для пневматики с энергией выше 7,5 Дж и калибром свыше 4,5 мм (например, охотничьей) необходимо:Получить лицензию на приобретение.Оформить разрешение на хранение и ношение.",
    model_link: "/models/wrath_of_the_goliaths_sniper_air_rifle_4k.glb",
    img_link: "/images/1.png",
    characteristics: {
      caliber: "",
      weight:"",
      length: "",
      capacity: "",
    },
  }, {
    id: 1,
    model: "Ножи",
    description: " ",
    law:"",
    model_link: "/models/m9_bayonet.glb",
    img_link: "/images/нож.png",
    characteristics: {
      length: "",
    },
  },
 
];

const WeaponGalleryPage: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWeapons(testWeapons);
      if (testWeapons.length > 0) {
        setSelectedWeapon(testWeapons[0]);
      }
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box sx={loadingContainerStyles}>
        <CircularProgress sx={{ color: "#8B4513" }} />
      </Box>
    );
  }

  return (
    <Box sx={pageWrapperStyles}>
      <Box sx={mainContentStyles}>
       <Box sx={{ ...modelViewerStyles, width: "50%" }}>
  {selectedWeapon?.model_link && (
    <Weapon3dModel 
      modelLink={selectedWeapon.model_link} 
      key={selectedWeapon.model_link} // Добавляем ключ для принудительного обновления компонента
    />
  )}
</Box>
        <Box sx={{ ...childrenColumnStyles, width: "50%" }}>
          <Box sx={upContentStyles}>
          <Box sx={weaponInfoStyles}>
            {selectedWeapon && (
              <>
                <Typography variant="h4" sx={{ mb: 3, color: "#8B4513" }}>
                  {selectedWeapon.model}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {selectedWeapon.description}
                </Typography>
                {selectedWeapon.characteristics && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ color: "#8B4513", mb: 2 }}>
                      Характеристики:
                    </Typography>
                    {selectedWeapon.characteristics.caliber && (
                      <Typography>
                        Калибр: {selectedWeapon.characteristics.caliber}
                      </Typography>
                    )}
                    {selectedWeapon.characteristics.weight && (
                      <Typography>
                        Вес: {selectedWeapon.characteristics.weight}
                      </Typography>
                    )}
                    {selectedWeapon.characteristics.length && (
                      <Typography>
                        Длина: {selectedWeapon.characteristics.length}
                      </Typography>
                    )}
                    {selectedWeapon.characteristics.capacity && (
                      <Typography>
                        Ёмкость магазина: {selectedWeapon.characteristics.capacity}
                      </Typography>
                    )}
                  </Box>
                )}
              </>
            )}
          </Box><Box sx={weaponInfoStyles}> 
            {selectedWeapon.law && (
                      <Typography>В России владение оружием регулируется законодательством, в частности, Федеральным законом № 150-ФЗ "Об оружии". Для каждого типа оружия необходимо получить соответствующее разрешение.
                        {selectedWeapon.law}
                      </Typography>
                    )}
                </Box> </Box>
          
          <Box sx={weaponCarouselStyles}>
            {weapons.map((weapon) => (
              <Box
                key={weapon.id}
                onClick={() => setSelectedWeapon(weapon)}
                sx={{
                  ...weaponCardStyles,
                  minWidth: "150px",
                  height: "100px",
                  backgroundImage: `url(${weapon.img_link})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  flexShrink: 0,
                }}
              /> 
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WeaponGalleryPage;
