import React from 'react';
import { Box, Grid } from '@mui/material';
import YandexMap from '../components/MapPage/YandexMap';
import LayersControl from '../components/MapPage/LayersControl';
import MapRoutesList from '../components/MapPage/MapRoutesList';
import AnimalsList from '../components/MapPage/AnimalsList';
import ZoneInfo from '../components/MapPage/ZoneInfo';

export default function MapPage() {
  return (
    <Box sx={{
      position: 'relative',
      width: '100vw',
      height: 'calc(100vh - 60px)',
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
        zIndex: -1
      }
    }}>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px 300px',
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
            <LayersControl />
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
  );
}