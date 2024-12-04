// components/AnimalsList.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AnimalsList() {
  return (
    <Box sx={{ 
      padding: '20px',
      minHeight: '150px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#947D5E',
      borderRadius: '8px',
      color: '#19290C'
    }}>
      <Typography variant="h6">
        Тут будет список животных
      </Typography>
    </Box>
  );
}