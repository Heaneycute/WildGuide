import React from 'react';
import { Placemark } from '@pbe/react-yandex-maps';

interface CabinsLayerProps {
  visible: boolean;
}

export const CabinsLayer: React.FC<CabinsLayerProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <>
      {/* Охотничьи домики */}
    </>
  );
};