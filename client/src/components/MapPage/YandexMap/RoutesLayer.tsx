import React from 'react';
import { Polyline } from '@pbe/react-yandex-maps';

interface RoutesLayerProps {
  visible: boolean;
}

export const RoutesLayer: React.FC<RoutesLayerProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <>
      {/* Маршруты и тропы */}
    </>
  );
};