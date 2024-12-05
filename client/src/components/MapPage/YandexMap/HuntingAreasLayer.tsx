// components/MapPage/YandexMap/HuntingAreasLayer.tsx

import { Polygon } from '@pbe/react-yandex-maps';

interface HuntingAreasLayerProps {
  visible: boolean;
}

export const HuntingAreasLayer: React.FC<HuntingAreasLayerProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <>
      {/* Здесь будет логика отрисовки полигонов охотничьих угодий */}
    </>
  );
};