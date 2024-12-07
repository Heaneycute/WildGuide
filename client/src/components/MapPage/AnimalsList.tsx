// components/AnimalsList.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { commonBoxStyles } from '../../Styles/MapPageComponents.styles';

export default function AnimalsList() {
  return (
    <Box sx={commonBoxStyles}>
      <Typography variant="h6" color="#ffffff">
        Тут будет список животных
      </Typography>
    </Box>
  );
}