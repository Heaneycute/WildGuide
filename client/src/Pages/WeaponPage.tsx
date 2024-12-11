import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Container } from "@mui/material";
import axiosInstance from "../axiosInstance";
import {pageWrapperStyles, mainContentStyles, modelViewerStyles, weaponCardStyles, loadingContainerStyles, childrenColumnStyles, weaponInfoStyles, weaponCarouselStyles } from "../Styles/WeaponPages.styles";
import Weapon3dModel from "../components/WeaponComponents/Weapon3dModel";

interface Weapon {
  id: number;
  model: string;
  description: string;
  model_link: string;
  img_link: string;
  characteristics?: {
    caliber?: string;
    weight?: string;
    length?: string;
    capacity?: string;
  };
}

const WeaponGalleryPage: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/api/v1/weapons")
      .then((response) => {
        setWeapons(response.data);
        if (response.data.length > 0) {
          setSelectedWeapon(response.data[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={loadingContainerStyles}>
        <CircularProgress sx={{ color: '#8B4513' }}/>
      </Box>
    );
  }
console.log(weapons)
  return (
    <Box sx={pageWrapperStyles}>
      <Box sx={mainContentStyles}>
        <Box sx={{ ...modelViewerStyles, width: '50%' }}>
          {selectedWeapon?.model_link && (
            <Weapon3dModel modelLink={selectedWeapon.model_link} />
          )}
        </Box>
        <Box sx={{ ...childrenColumnStyles, width: '50%' }}>
          <Box sx={weaponInfoStyles}>
            {selectedWeapon && (
              <>
                <Typography variant="h4" sx={{ mb: 3, color: '#8B4513' }}>
                  {selectedWeapon.model}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {selectedWeapon.description}
                </Typography>
                {selectedWeapon.characteristics && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ color: '#8B4513', mb: 2 }}>
                      Характеристики:
                    </Typography>
                    {selectedWeapon.characteristics.caliber && (
                      <Typography>Калибр: {selectedWeapon.characteristics.caliber}</Typography>
                    )}
                    {selectedWeapon.characteristics.weight && (
                      <Typography>Вес: {selectedWeapon.characteristics.weight}</Typography>
                    )}
                    {selectedWeapon.characteristics.length && (
                      <Typography>Длина: {selectedWeapon.characteristics.length}</Typography>
                    )}
                    {selectedWeapon.characteristics.capacity && (
                      <Typography>Ёмкость магазина: {selectedWeapon.characteristics.capacity}</Typography>
                    )}
                  </Box>
                )}
              </>
            )}
          </Box>
          <Box sx={weaponCarouselStyles}>
            {weapons.map((weapon) => (
              <Box
                key={weapon.id}
                onClick={() => setSelectedWeapon(weapon)}
                sx={{
                  ...weaponCardStyles,
                  minWidth: '150px',
                  height: '100px',
                  backgroundImage: `url(${weapon.img_link})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
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