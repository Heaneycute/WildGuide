import React, { useEffect } from 'react';
import { Polygon } from '@pbe/react-yandex-maps';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../Redux/index';
import { fetchHuntingAreas } from '../../../Redux/Thunks/MapPage/huntingAreasThunks';
import { selectAllAreas, selectArea } from '../../../Redux/Slices/MapPage/huntingAreasSlice';
import { HuntingArea } from '../../../types/MapPage/HuntingAreaType';

interface HuntingAreasLayerProps {
  visible: boolean;
}

export const HuntingAreasLayer: React.FC<HuntingAreasLayerProps> = ({ visible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const areas = useSelector(selectAllAreas);
  
  useEffect(() => {
    console.log('Отправка запроса на получение охотничьих зон');
    dispatch(fetchHuntingAreas());
  }, [dispatch]);
  
  const handlePolygonClick = (e: any, area: HuntingArea) => {
    console.log('Клик по полигону:', area);
    e.preventDefault();
    dispatch(selectArea(area));
  };

  if (!visible || !areas || !Array.isArray(areas)) return null;
  
  return (
    <>
      {areas.map((area) => (
        <Polygon
          key={area.id}
          geometry={area.coordinates}
          options={{
            fillColor: 'rgba(0, 255, 0, 0.3)',
            strokeColor: '#00FF00',
            strokeWidth: 2
          }}
          onClick={(e) => handlePolygonClick(e, area)}
        />
      ))}
    </>
  );
};

