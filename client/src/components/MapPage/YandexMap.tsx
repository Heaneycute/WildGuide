import React from 'react';
import { Box } from '@mui/material';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import { mapBoxStyles } from '../../Styles/MapPageComponents.styles';
import { HuntingAreasLayer } from './YandexMap/HuntingAreasLayer';
import { AnimalsLayer } from './YandexMap/AnimalsLayer';
import { RoutesLayer } from './YandexMap/RoutesLayer';
import { CabinsLayer } from './YandexMap/CabinsLayer';
import { customMapStyle } from './MapStyles';


const YandexMap: React.FC = () => {
  const mapState = {
    center: [59.56, 150.80],
    zoom: 9,
    controls: []
  };

  return (
    <Box sx={{ ...mapBoxStyles, ...customMapStyle }}>
      <YMaps query={{ 
        apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
        lang: 'ru_RU'
      }}>
        <Map
          defaultState={mapState}
          options={{
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true
          }}
          width="100%"
          height="100%"
        />
      </YMaps>
    </Box>
  );
};

export default YandexMap;