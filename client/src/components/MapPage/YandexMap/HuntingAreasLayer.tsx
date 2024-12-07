import React, { useEffect } from 'react';
import { Polygon, Placemark } from '@pbe/react-yandex-maps';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../Redux/index';
import { fetchHuntingAreas } from '../../../Redux/Thunks/MapPage/huntingAreasThunks';
import { selectAllAreas, selectArea } from '../../../Redux/Slices/MapPage/huntingAreasSlice';
import { HuntingArea } from '../../../types/MapPage/HuntingAreaType';

interface HuntingAreasLayerProps {
  visible: boolean;
}

const getCenterCoordinates = (coordinates: number[][]) => {
  const lats = coordinates.map(coord => coord[0]);
  const lons = coordinates.map(coord => coord[1]);
  
  const centerLat = (Math.max(...lats) + Math.min(...lats)) / 2;
  const centerLon = (Math.max(...lons) + Math.min(...lons)) / 2;
  
  return [centerLat, centerLon];
};

export const HuntingAreasLayer: React.FC<HuntingAreasLayerProps> = ({ visible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const areas = useSelector(selectAllAreas);

  useEffect(() => {
    dispatch(fetchHuntingAreas());
  }, [dispatch]);

  const handlePolygonClick = (e: any, area: HuntingArea) => {
    e.preventDefault();
    dispatch(selectArea(area));
  };

  if (!visible || !areas || !Array.isArray(areas)) return null;

  return (
    <>
      {areas.map((area) => (
        <React.Fragment key={area.id}>
          <Polygon
            geometry={[area.coordinates]}
            options={{
              fillColor: 'rgba(0, 255, 0, 0.3)',
              strokeColor: '#00FF00',
              strokeWidth: 2
            }}
            onClick={(e) => handlePolygonClick(e, area)}
          />
          <Placemark
            geometry={getCenterCoordinates(area.coordinates)}
            properties={{
              iconCaption: area.name || 'Охотничья зона',
              hintContent: area.description || 'Описание отсутствует',
            }}
            options={{
              preset: 'islands#transparent',
              zIndex: 1000
            }}
          />
        </React.Fragment>
      ))}
    </>
  );
};