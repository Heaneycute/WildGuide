import React, { useEffect } from 'react';
import { Placemark } from '@pbe/react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllAnimals } from '../../../Redux/Slices/MapPage/animalsSlice';
import { fetchAnimals } from '../../../Redux/Thunks/MapPage/animalsThunks';
import type { AppDispatch } from '../../../Redux/index';

interface AnimalsLayerProps {
  visible: boolean;
}

export const AnimalsLayer: React.FC<AnimalsLayerProps> = ({ visible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const animals = useSelector(selectAllAnimals);

  useEffect(() => {
    console.log('AnimalsLayer: Загрузка животных...');
    dispatch(fetchAnimals());
  }, [dispatch]);

  if (!visible) return null;

  console.log('AnimalsLayer: Текущие животные:', animals);

  return (
    <>
      {animals.map((animal) => {
        const coordinates = [animal.lastKnownLocations[0].lat, animal.lastKnownLocations[0].lng];
        
        console.log(`Отрисовка животного ${animal.id}:`, {
          coordinates,
          category: animal.category,
          status: animal.protectionStatus
        });
        
        const formatDate = (dateStr: string) => {
          const [month, day] = dateStr.split('-');
          return `${day}.${month}`;
        };
        
        return (
          <Placemark
            key={animal.id}
            geometry={coordinates}
            options={{
              preset: 'islands#circleDotIcon',
              iconColor: animal.protectionStatus === 'protected' ? '#ff0000' : 
                        animal.protectionStatus === 'endangered' ? '#ff6b00' : 
                        animal.protectionStatus === 'hunting-allowed' ? '#00ff00' : 
                        '#808080'
            }}
            properties={{
              balloonContentHeader: `<h3 style="color: ${
                animal.protectionStatus === 'protected' ? '#ff0000' : 
                animal.protectionStatus === 'endangered' ? '#ff6b00' : 
                animal.protectionStatus === 'hunting-allowed' ? '#00ff00' : 
                '#808080'
              }">${animal.name}</h3>`,
              balloonContentBody: `
                <p><strong>Описание:</strong> ${animal.description}</p>
                <p><strong>Сезон охоты:</strong> ${formatDate(animal.huntingSeason.start)} - ${formatDate(animal.huntingSeason.end)}</p>
                <p><strong>Популяция:</strong> ${animal.populationDensity.count} особей на ${animal.populationDensity.area}</p>
                <p><strong>Последнее обновление:</strong> ${animal.populationDensity.lastUpdated}</p>
                <p><strong>Статус:</strong> ${animal.protectionStatus}</p>
              `,
              hideIconOnBalloonOpen: false,
              balloonCloseButton: true
            }}
          />
        );
      })}
    </>
  );
};