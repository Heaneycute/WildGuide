import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import YandexMap from '../components/MapPage/YandexMap';
import LayersControl from '../components/MapPage/LayersControl';
import MapRoutesList from '../components/MapPage/MapRoutesList';
import AnimalsList from '../components/MapPage/AnimalsList';
import ZoneInfo from '../components/MapPage/ZoneInfo';
import { selectSelectedArea } from '../Redux/Slices/MapPage/huntingAreasSlice';

export default function MapPage() {
  const selectedArea = useSelector(selectSelectedArea); //ВыводЗонСостояние
  const [layers, setLayers] = useState({
    hunting: true,
    animals: true,
    cabins: true,
    trails: true
  });

  const [mapLayers, setMapLayers] = useState({
    satellite: false,
    scheme: true,
    hybrid: false
  });

  const handleMapTypeChange = (type: string) => {
    const newLayers = {
      satellite: false,
      scheme: false,
      hybrid: false,
      [type]: true
    };
    setMapLayers(newLayers);
  };

  const handleLayerToggle = (layer: string) => {
    setLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/images/nature-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.8)',
          zIndex: -1
        }
      }}
    >
    <Box sx={{
          height: 'calc(100vh - 70px)',
          marginTop: '70px',
          position: 'relative',
          zIndex: 1,
          overflow: 'auto'
        }}>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px 500px',
        padding: '20px',
        gap: '20px',
        height: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: '20px'
        }}>
          <Box sx={{ flex: '0 0 auto' }}>
          <LayersControl 
            layers={layers} 
            onLayerToggle={handleLayerToggle}
            mapLayers={mapLayers}
            onMapTypeChange={handleMapTypeChange}
          />
          </Box>
          <Box sx={{ flex: '1' }}>
            <YandexMap />
          </Box>
        </Box>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: '20px'
        }}>
          <Box sx={{ flex: '1' }}>
            <ZoneInfo />
          </Box>
          <Box sx={{ flex: '1' }}>
            <AnimalsList />
          </Box>
        </Box>
        <Box sx={{ height: '100%' }}>
          <MapRoutesList />
        </Box>
      </Box>
    </Box>
    </Box>
  );
}