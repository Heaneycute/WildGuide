// components/LayersControl.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { commonBoxStyles } from '../../Styles/MapPageComponents.styles';

export default function LayersControl() {
  return (
    <Box sx={commonBoxStyles}>
      <Typography variant="h6" color="#ffffff">
        Тут будет контроллер слоев
      </Typography>
      <Box sx={commonBoxStyles}>Иконка</Box>
      <Box sx={commonBoxStyles}>Иконка</Box>
      <Box sx={commonBoxStyles}>Иконка</Box>
    </Box>
  );
}