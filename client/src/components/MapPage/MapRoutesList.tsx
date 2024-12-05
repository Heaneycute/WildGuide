// components/MapRoutesList.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { commonBoxStyles } from '../../Styles/MapPageComponents.styles';

export default function MapRoutesList() {
  return (
    <Box sx={commonBoxStyles}>
      <Typography variant="h6" color="#ffffff">
        Тут будет список маршрутов
      </Typography>
    </Box>
  );
}