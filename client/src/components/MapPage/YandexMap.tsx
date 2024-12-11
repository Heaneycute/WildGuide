import React from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import { mapBoxStyles, favoritesListStyles } from '../../Styles/MapPageComponents.styles';
import { HuntingAreasLayer } from './YandexMap/HuntingAreasLayer';
import { RoutesLayer } from './YandexMap/RoutesLayer';
import { customMapStyle } from '../../Styles/MapStyles.styles';
import { clearSelectedArea } from '../../Redux/Slices/MapPage/huntingAreasSlice';
import FavoritesList from './FavoritesList';

interface MapState {
  center: [number, number];
  zoom: number;
  controls: string[];
  type: 'yandex#map' | 'yandex#satellite' | 'yandex#hybrid';
}

const YandexMap: React.FC = () => {
  const dispatch = useDispatch();
  
  const handleMapClick = (e: any) => {
    console.log('Произошел клик по карте:', {
      target: e.get('target'),
      тип: e.get('target').constructor.name,
      координаты: e.get('coords'),
      время: new Date().toLocaleString()
    });
  
    if (!e.get('target').geometry) {
      console.log('Начинаем очистку выбранной области...', {
        предыдущаяОбласть: 'Будет удалена',
        статус: 'В процессе очистки',
        действие: 'Вызов dispatch(clearSelectedArea())'
      });
      dispatch(clearSelectedArea());
    }
  };

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
          onClick={handleMapClick}
          options={{
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          }}
          width="100%"
          height="100%"
        >
          <HuntingAreasLayer visible={true} />
          <RoutesLayer visible={true} />
        </Map>
      </YMaps>
      <Box sx={favoritesListStyles}>
        <FavoritesList />
      </Box>
    </Box>
  );
};

export default YandexMap;