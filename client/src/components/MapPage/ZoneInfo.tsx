// components/ZoneInfo.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ZoneInfo() {
  return (
    <Box sx={{ 
      padding: '20px',
      minHeight: '150px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5F3D22',
      borderRadius: '8px',
      color: '#DFD6CD'
    }}>
      <Typography variant="h6">
        Тут будет информация о зоне
      </Typography>
    </Box>
  );
}