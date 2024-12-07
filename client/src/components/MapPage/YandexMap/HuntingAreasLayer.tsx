import React, { useEffect } from 'react';
import { Polygon, Placemark } from '@pbe/react-yandex-maps';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/index';
import { fetchHuntingAreas } from '../../../Redux/Thunks/MapPage/huntingAreasThunks';
import { 
  selectAllAreas, 
  selectArea, 
  selectSelectedArea 
} from '../../../Redux/Slices/MapPage/huntingAreasSlice';
import { HuntingArea } from '../../../types/MapPage/HuntingAreaType';

const getCenterCoordinates = (coordinates: number[][]) => {
  const lats = coordinates.map(coord => coord[0]);
  const lons = coordinates.map(coord => coord[1]);
  
  const centerLat = (Math.max(...lats) + Math.min(...lats)) / 2;
  const centerLon = (Math.max(...lons) + Math.min(...lons)) / 2;
  
  return [centerLat, centerLon];
};

export const HuntingAreasLayer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const areas = useSelector(selectAllAreas);
  const selectedArea = useSelector(selectSelectedArea);
  const isVisible = useSelector((state: RootState) => state.layers.hunting);

  useEffect(() => {
    dispatch(fetchHuntingAreas());
  }, [dispatch]);

  const handlePolygonClick = (e: any, area: HuntingArea) => {
    e.preventDefault();
    dispatch(selectArea(area));
  };

  if (!isVisible || !areas || !Array.isArray(areas)) return null;

  return (
    <>
      {areas.map((area) => {
        const isSelected = selectedArea?.id === area.id;
        const polygonOptions = {
          fillColor: isSelected 
            ? 'rgba(0, 255, 0, 0.4)' // Светлее для выбранной
            : 'rgba(0, 255, 0, 0.7)', // Темнее для невыбранных
          strokeColor: isSelected ? '#00FF00' : '#00DE2A',
          strokeWidth: 2,
          strokeStyle: isSelected ? 'dash' : 'solid'
        };

        return (
          <React.Fragment key={area.id}>
            <Polygon
              geometry={[area.coordinates]}
              options={polygonOptions}
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
              onClick={(e) => handlePolygonClick(e, area)}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};