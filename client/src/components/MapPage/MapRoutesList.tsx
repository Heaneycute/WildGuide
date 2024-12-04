// components/MapRoutesList.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function MapRoutesList() {
  return (
    <Box sx={{ 
      padding: '20px',
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#B9C096',
      borderRadius: '8px',
      color: '#19290C'
    }}>
      <Typography variant="h6">
        Тут будет список маршрутов
      </Typography>
    </Box>
  );
}