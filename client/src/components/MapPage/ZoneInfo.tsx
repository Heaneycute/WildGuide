// components/ZoneInfo.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { commonBoxStyles } from '../../Styles/MapPageComponents.styles';

export default function ZoneInfo() {
  return (
    <Box sx={commonBoxStyles}>
      <Typography variant="h6" color="#ffffff">
        Тут будет информация о зоне
      </Typography>
    </Box>
  );
}