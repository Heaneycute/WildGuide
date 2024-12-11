import React, { useEffect } from 'react';
import { Placemark } from '@pbe/react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCabins } from '../../../Redux/Slices/MapPage/huntingCabinsSlice';
import { fetchHuntingCabins } from '../../../Redux/Thunks/MapPage/huntingCabinsThunks';
import type { AppDispatch } from '../../../Redux/index';

interface CabinsLayerProps {
  visible: boolean;
}

export const CabinsLayer: React.FC<CabinsLayerProps> = ({ visible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cabins = useSelector(selectAllCabins);

  useEffect(() => {
    console.log('CabinsLayer: Загрузка домиков...');
    dispatch(fetchHuntingCabins());
  }, [dispatch]);

  if (!visible) return null;

  console.log('CabinsLayer: Текущие домики:', cabins);

  return (
    <>
      {cabins.map((cabin) => {
        const coordinates = [cabin.coordinates.lat, cabin.coordinates.lng];
        console.log(`Отрисовка домика ${cabin.id}:`, coordinates);
        
        return (
          <Placemark
            key={cabin.id}
            geometry={coordinates}
            options={{
              preset: 'islands#homeIcon',
              iconImageSize: [32, 32],
              iconImageOffset: [-16, -16]
            }}
            properties={{
              balloonContent: `
                <h3>${cabin.name}</h3>
                <p>${cabin.description || ''}</p>
                <p>Вместимость: ${cabin.capacity} чел.</p>
                <p>Тип: ${cabin.buildingType}</p>
                <p>Сезон: ${cabin.usageSeason}</p>
                <p>Стоимость: ${cabin.price} ₽</p>
                <p>Доступ: ${cabin.transportAccess}</p>
              `
            }}
          />
        );
      })}
    </>
  );
};