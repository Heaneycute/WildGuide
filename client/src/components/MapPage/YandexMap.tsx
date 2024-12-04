// components/YandexMap.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function YandexMap() {
  return (
    <Box sx={{ 
      padding: '20px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(124, 152, 78, 0.1)',
      borderRadius: '8px'
    }}>
      <Typography variant="h6" color="#19290C">
        Тут будет Яндекс Карта
      </Typography>
    </Box>
  );
}