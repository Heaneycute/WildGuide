// components/LayersControl.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function LayersControl() {
  return (
    <Box sx={{ 
      padding: '20px',
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#7C984E',
      borderRadius: '8px',
      color: '#19290C'
    }}>
      <Typography variant="h6">
        Тут будет контроллер слоев
      </Typography>
    </Box>
  );
}