// components/YandexMap.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { mapBoxStyles } from '../../Styles/MapPageComponents.styles';

export default function YandexMap() {
  return (
    <Box sx={mapBoxStyles}>
      <Typography variant="h6" color="#ffffff">
        Тут будет Яндекс Карта
      </Typography>
    </Box>
  );
}