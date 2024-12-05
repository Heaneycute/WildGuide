// YandexMap.tsx
import React from 'react';
import { Box } from '@mui/material';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import { mapBoxStyles } from '../../Styles/MapPageComponents.styles';

export default function YandexMap() {
  const defaultState = {
    center: [55.75, 37.57],
    zoom: 9
  };

  return (
    <Box sx={{ ...mapBoxStyles }}>
      <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY }}>
        <Map
          defaultState={defaultState}
          width="100%"
          height="100%"
        />
      </YMaps>
    </Box>
  );
}