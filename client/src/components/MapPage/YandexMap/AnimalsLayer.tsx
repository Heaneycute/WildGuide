import React from 'react';
import { Placemark } from '@pbe/react-yandex-maps';

interface AnimalsLayerProps {
  visible: boolean;
}

export const AnimalsLayer: React.FC<AnimalsLayerProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <>
      {/* Метки животных и миграций */}
    </>
  );
};