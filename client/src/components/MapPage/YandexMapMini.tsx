import React from 'react';
import { Box } from '@mui/material';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import { mapBoxStyles } from '../../Styles/MapPageComponents.styles';
import { HuntingAreasLayer } from './YandexMap/HuntingAreasLayer';
import { customMapStyle } from '../../Styles/MapStyles.styles';

interface MapState {
  center: [number, number];
  zoom: number;
  controls: string[];
  type: 'yandex#map' | 'yandex#satellite' | 'yandex#hybrid';
}

const YandexMapMini: React.FC = () => {
  const mapState: MapState = {
    center: [59.56, 150.80],
    zoom: 9,
    controls: [],
    type: 'yandex#map'
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
            yandexMapDisablePoiInteractivity: true,
            dragPan: false,
            scrollZoom: false,
            dblClickZoom: false,
          }}
          width="100%"
          height="100%"
        >
          <HuntingAreasLayer visible={true} />
        </Map>
      </YMaps>
    </Box>
  );
};

export default YandexMapMini;