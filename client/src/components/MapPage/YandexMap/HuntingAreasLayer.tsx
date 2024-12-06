import React from 'react';
import { Polygon } from '@pbe/react-yandex-maps';

interface HuntingAreasLayerProps {
  visible: boolean;
}

export const HuntingAreasLayer: React.FC<HuntingAreasLayerProps> = ({ visible }) => {
  if (!visible) return null;
  
  return (
    <>
      {/* Полигоны охотничьих угодий */}
    </>
  );
};



HuntingAreasLayer.tsx