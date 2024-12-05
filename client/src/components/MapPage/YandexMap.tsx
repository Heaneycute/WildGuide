import React from 'react';
import { Box } from '@mui/material';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import { mapBoxStyles } from '../../Styles/MapPageComponents.styles';
import { HuntingAreasLayer } from './YandexMap/HuntingAreasLayer';
import { AnimalsLayer } from './YandexMap/AnimalsLayer';
import { RoutesLayer } from './YandexMap/RoutesLayer';
import { CabinsLayer } from './YandexMap/CabinsLayer';

const YandexMap: React.FC = () => {
  const mapState = {
    center: [55.75, 37.57],
    zoom: 9
  };

  const mapOptions = {
    suppressMapOpenBlock: true,
    yandexMapDisablePoiInteractivity: true,
    scrollZoom: false
  };

  return (
    <Box sx={{ ...mapBoxStyles }}>
      <YMaps query={{ 
        apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
        lang: 'ru_RU'
      }}>
        <Map
          defaultState={mapState}
          options={mapOptions}
          width="100%"
          height="100%"
        >
          <HuntingAreasLayer visible={true} />
          <AnimalsLayer visible={true} />
          <RoutesLayer visible={true} />
          <CabinsLayer visible={true} />
        </Map>
      </YMaps>
    </Box>
  );
};

export default YandexMap;