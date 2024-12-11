import React, { useEffect } from 'react';
import { Polyline } from '@pbe/react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllRoutes } from '../../../Redux/Slices/MapPage/routesSlice';
import { fetchRoutes } from '../../../Redux/Thunks/MapPage/routesThunks';
import type { AppDispatch } from '../../../Redux/index';

interface RoutesLayerProps {
  visible: boolean;
}

export const RoutesLayer: React.FC<RoutesLayerProps> = ({ visible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const routes = useSelector(selectAllRoutes);

  useEffect(() => {
    console.log('RoutesLayer: Загрузка маршрутов...');
    dispatch(fetchRoutes());
  }, [dispatch]);

  if (!visible) return null;

  console.log('RoutesLayer: Текущие маршруты:', routes);

  return (
    <>
      {routes.map((route) => {
        const coordinates = route.waypoints.map(point => [point.lat, point.lng]);
        
        console.log(`Отрисовка маршрута ${route.id}:`, coordinates);
        
        return (
          <Polyline
            key={route.id}
            geometry={coordinates}
            options={{
              strokeColor: '#FF0000',
              strokeWidth: 3,
              strokeOpacity: 0.8,
              strokeStyle: 'dot'
            }}
          />
        );
      })}
    </>
  );
};