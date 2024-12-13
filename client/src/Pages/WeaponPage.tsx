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
    description:
      "Гладкоствольное оружие представляет собой вид огнестрельного оружия с гладким стволом без нарезов. Это означает, что пуля не стабилизируются вращением, в отличие от нарезного. \r\n Наиболее распространенные типы патронов, используемых в ружьях содержат дробь, картечь или пулю.\r\n  Дробь используется для охоты на мелкую дичь и птиц, картечь — на крупную дичь, а пули — на дальние дистанции.  ",
    law:
      "Для приобретения и владения гладкоствольным оружием требуется: \n - Получить лицензию на приобретение гладкоствольного оружия.\n  Условия: \n - Возраст от 18 лет, пройти медицинскую комиссию, включая психиатра и нарколога.\n- Пройти обучение правилам обращения с оружием и получить сертификат.\n- Зарегистрировать сейф для хранения оружия.\n- После покупки оружия необходимо оформить разрешение на хранение и ношение в течение 14 дней. \n \n Лицензию можно получить:\n - онлайн на Госуслугах — приглашение для записи на приём придёт в личный кабинет https://www.gosuslugi.ru/ \n - лично в подразделении Росгвардии https://rosguard.gov.ru/page/index/licenzionnorazreshitelnaya-rabota \n \n Обращаться за выдачей лицензии на охотничье оружие нужно после того, как получите охотничий билет",
    model_link: "/models/mossberg.glb",
    img_link: "/images/1.png",
    characteristics: {
      caliber: "12/70, 12/76 (магнум), 20/70, 20/76",
      weight: " 2,8–3,5 кг",
      length: "1000–1200 мм",
      capacity: "1-10",
    },
  },
  {
    id: 2,
    model: "Нарезное оружие",
    description: " Нарезное оружие отличается наличием нарезов в стволе, которые заставляют пулю вращаться вокруг своей оси. Это обеспечивает её устойчивость в полёте и точность на дальних расстояниях. Оно применяется как для охоты, так и для спортивной стрельбы и самообороны. \n Наиболее популярные виды патронов для нарезного оружия — калибры от .223 до .308 для охоты и спортивных целей, а также крупные калибры, например .338 Lapua Magnum, для дальнобойной стрельбы.",
    law: "Для нарезного оружия требования строже, чем для гладкоствольного: \n - Сначала необходимо владеть гладкоствольным оружием не менее 5 лет и не иметь нарушений. \n - Получить лицензию на приобретение нарезного оружия. \n - После покупки также нужно оформить разрешение на хранение и ношение. \n  \n Пошаговая инструкция для получения лицензии на охотничье огнестрельное оружие с нарезным стволом: \n - Получить медицинские справки;  \n - Купить сейф; \n - Подать заявление на оформление лицензии на https://www.gosuslugi.ru/ \n - Получить акт о проверке условий хранения; \n - Забрать лицензию; \n - Купить оружие; \n - Получить разрешение;   ",
      model_link: "/models/hunting_rifle.glb",
    img_link: "/images/2.png",
    characteristics: {
      caliber: ".223, .308, .338 и другие",
      weight: " 3–6 кг",
      length: "1000–1200 мм",
      capacity: "5-10",
    },
  },
  {
    id:3,
    model: "Пневматическое оружие",
    description: "Пневматическое оружие использует сжатый воздух или газ для выстрела снаряда. Оно делится на две основные категории: \n - Оружие с энергией выстрела до 7,5 Дж и калибром до 4,5 мм (развлекательное и спортивное). \n - Оружие с энергией свыше 7,5 Дж (например, охотничье пневматическое оружие).",
    law: "Для пневматического оружия с энергией выстрела до 7,5 Дж и калибром до 4,5 мм (например, спортивные и развлекательные модели) разрешение не требуется. \n Для пневматики с энергией выше 7,5 Дж и калибром свыше 4,5 мм (например, охотничьей) необходимо: \n - Получить лицензию на приобретение. \n - Оформить разрешение на хранение и ношение.  \n В соответствии со статьями 9, 13 ФЗ «Об оружии», приказом Росгвардии от 18.08.2017 № 359 для получения лицензии на охотничье пневматическое оружие гражданин предоставляет:  \n - заявление; \n -  паспорт гражданина РФ;  \n - медицинские заключения формы № 002-Оу и № 003-Оу;  \n - документы о прохождении подготовки и проверки знания правил безопасного обращения с оружием; \n -  охотничий билет единого федерального образца;  \n - копия приказа о приеме на работу (для егерей, охотоведов).й. \n - Получить лицензию на приобретение нарезного оружия. \n - После покупки также нужно оформить разрешение на хранение и ношение. \n  \n Пошаговая инструкция для получения лицензии на охотничье огнестрельное оружие с нарезным стволом: \n - Получить медицинские справки;  \n - Купить сейф; \n  Подать заявление на оформление лицензии на https://www.gosuslugi.ru/ ",
    model_link: "/models/wrath_of_the_goliaths_sniper_air_rifle_4k.glb",
    img_link: "/images/3.png",
    characteristics: {
      caliber: "4,5 мм, 5,5 мм",
      weight: "2,5–4 кг",
      length: "800–1200 мм",
    },
  },
  {
    id: 4,
    model: "Холодное оружие",
    description: "Холодное оружие включает в себя ножи, мечи, кинжалы и другие виды клинкового оружия. Оно может использоваться для самообороны, охоты, коллекционирования или бытовых нужд. ",
    law: "- Ножи, длина клинка которых не превышает 90 мм, не считаются оружием и не требуют разрешения. \n -  Оружейные ножи (например, охотничьи) требуют лицензии, аналогичной нарезному оружию. \n  \n  Чтобы получить разрешение на холодное оружие, необходимо обратиться в уполномоченные органы: \n - территориальное подразделение МВД либо территориальный орган Росгвардии.  \n   \n Узнать наименование и точный адрес уполномоченного органа, в который нужно обратиться в каждом конкретном случае, можно на. Едином портале Госуслуг.",
    model_link: "/models/m9_bayonet.glb",
    img_link: "/images/5.png",
    characteristics: {
      length: "100–300 мм",
        weight: "0,3–1 кг",
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
              key={selectedWeapon.model_link} 
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
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                      textAlign: "left",
                    }}
                  >
                    {selectedWeapon.description}
                  </Typography>
                  {selectedWeapon.characteristics && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" sx={{ color: "#8B4513", mb: 2 }}>
                        Характеристики:
                      </Typography>
                      {selectedWeapon.characteristics.caliber && (
                        <Typography sx={{
                      mb: 3,
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                      textAlign: "left",
                    }}>
                          Калибр: {selectedWeapon.characteristics.caliber}
                        </Typography>
                      )}
                      {selectedWeapon.characteristics.weight && (
                        <Typography sx={{
                      mb: 3,
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                      textAlign: "left",
                    }}>
                          Вес: {selectedWeapon.characteristics.weight}
                        </Typography>
                      )}
                      {selectedWeapon.characteristics.length && (
                        <Typography sx={{
                      mb: 3,
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                      textAlign: "left",
                    }}>
                          Длина: {selectedWeapon.characteristics.length}
                        </Typography>
                      )}
                      {selectedWeapon.characteristics.capacity && (
                        <Typography sx={{
                      mb: 3,
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                      textAlign: "left",
                    }}>
                          Ёмкость магазина:{" "}
                          {selectedWeapon.characteristics.capacity}
                        </Typography>
                      )}
                    </Box>
                  )}
                </>
              )}
            </Box>
            <Box sx={weaponInfoStyles}>
              <Typography variant="h6" sx={{ color: "#8B4513", mb: 3 }}>
                        Разрешение:
                      </Typography>
              {selectedWeapon.law && (
               <Typography
  sx={{
    mt: 3,
    lineHeight: 1.8,
    whiteSpace: "pre-line",
    textAlign: "left",
  }}
>
  {selectedWeapon.law.split(/(https?:\/\/\S+)/g).map((part, index) =>
    part.match(/https?:\/\/\S+/) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#8B4513", textDecoration: "underline" }}
      >
        {part}
      </a>
    ) : (
      part
    )
  )}
</Typography>
              )}
            </Box>
          </Box>

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
