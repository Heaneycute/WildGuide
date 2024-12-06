import React, { useState } from 'react';
import { Box } from '@mui/material';
import { YMaps, Map, Circle, Polygon, Polyline, Rectangle, Placemark } from '@pbe/react-yandex-maps';
import { mapBoxStyles } from '../../Styles/MapPageComponents.styles';
import { HuntingAreasLayer } from './YandexMap/HuntingAreasLayer';
import { AnimalsLayer } from './YandexMap/AnimalsLayer';
import { RoutesLayer } from './YandexMap/RoutesLayer';
import { CabinsLayer } from './YandexMap/CabinsLayer';
import { customMapStyle } from '../../Styles/MapStyles';
import { CustomPopupInfo } from './YandexMap/CustomPopupInfo';

const YandexMap: React.FC = () => {
  const [popupPosition, setPopupPosition] = useState<[number, number] | null>(null);
  const [selectedArea, setSelectedArea] = useState<SelectedArea | null>(null);

  const mapState: MapState = {
    center: [59.56, 150.80],
    zoom: 9,
    controls: [],
    type: 'yandex#map'
  };

  const handlePolygonClick = (e: any) => {
    const coords = e.get('coords');
    setPopupPosition(coords);
    setSelectedArea({ 
      name: "Охотничье угодье №1",
      description: "Живопиыысная территория с разнообразным ландшафтом",
      licenses: [
        { name: "Лицензия на копытных", valid: "31.12.2024" },
        { name: "Лицензия на медведя", valid: "30.11.2024" }
      ],
      animals: ["Лось", "Медведь", "Кабан"],
      routes: [
        { name: "Северный маршрут", length: "15 км" },
        { name: "Горный маршрут", length: "8 км" }
      ],
      restrictions: ["Запрет охоты с 1.05 по 1.06"],
      migrations: [
        { animal: "Лось", period: "Март-Апрель", direction: "С→Ю" },
        { animal: "Медведь", period: "Май", direction: "Горы→Долины" }
      ],
      terrain: {
        elevation: "500-1200м",
        vegetation: "Смешанный лес",
        water: "2 реки, 1 озеро"
      },
      facilities: ["Охотничья база", "Смотровая вышка", "Кормушки"]
    });
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
          }}
          width="100%"
          height="100%"
        >
          <Polygon
            geometry={[
              [
                [59.57, 150.85],
                [59.58, 150.87],
                [59.59, 150.86],
                [59.60, 150.88],
                [59.59, 150.90],
                [59.57, 150.91],
                [59.56, 150.89],
                [59.55, 150.86],
                [59.56, 150.85],
                [59.57, 150.85]
              ],
              [
                [59.57, 150.87],
                [59.58, 150.88],
                [59.57, 150.89],
                [59.56, 150.88],
                [59.57, 150.87]
              ]
            ]}
            options={{
              fillColor: 'rgba(0, 255, 0, 0.3)',
              strokeColor: '#00FF00',
              strokeWidth: 2
            }}
            onClick={handlePolygonClick}
          />

          {/* Линия маршрута */}
          <Polyline
            geometry={[
              [59.54, 150.75],
              [59.55, 150.78],
              [59.54, 150.80],
              [59.55, 150.82],
              [59.53, 150.83],
              [59.54, 150.85],
              [59.53, 150.87],
              [59.52, 150.86],
              [59.51, 150.88]
            ]}
            options={{
              strokeColor: '#FFFF00',
              strokeWidth: 4,
              strokeStyle: 'dash'
            }}
          />

          {/* Прямоугольник */}
          <Rectangle
            geometry={[[59.52, 150.83], [59.54, 150.87]]}
            options={{
              fillColor: 'rgba(255, 0, 255, 0.3)',
              strokeColor: '#FF00FF',
              strokeWidth: 2
            }}
          />

          {/* Метка */}
          <Placemark
            geometry={[59.55, 150.82]}
            options={{
              preset: 'islands#redDotIcon'
            }}
          />

          <HuntingAreasLayer />
          <AnimalsLayer />
          <RoutesLayer />
          <CabinsLayer />
        </Map>
      </YMaps>
      
      {popupPosition && selectedArea && (
        <CustomPopupInfo
          position={popupPosition}
          area={selectedArea}
          onClose={() => {
            setPopupPosition(null);
            setSelectedArea(null);
          }}
        />
      )}
    </Box>
  );
};

export default YandexMap;