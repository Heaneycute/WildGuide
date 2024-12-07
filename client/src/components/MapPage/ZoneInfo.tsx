import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSelectedArea } from '../../Redux/Slices/MapPage/huntingAreasSlice';
import { commonBoxStyles } from '../../Styles/MapPageComponents.styles';

export default function ZoneInfo() {
  const selectedArea = useSelector(selectSelectedArea);

  if (!selectedArea) {
    return (
      <Box sx={commonBoxStyles}>
        <Typography variant="h6" color="#ffffff">
          Выберите зону на карте для просмотра информации
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={commonBoxStyles}>
      <Typography variant="h5" color="#ffffff" gutterBottom>
        {selectedArea.name}
      </Typography>
      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
      <Typography variant="body1" color="#ffffff">
        {selectedArea.description}
      </Typography>
    </Box>
  );
}