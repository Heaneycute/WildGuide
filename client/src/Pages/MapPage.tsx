// MapPage.tsx
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
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.8)',
        zIndex: -1
      }
    }}>
      <Box sx={{
        display: 'flex',
        padding: '20px',
        gap: '20px',
        height: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        <Box sx={{ 
          flex: '1', 
          border: '1px solid rgba(124, 152, 78, 0.3)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(124, 152, 78, 0.1)',
          borderRadius: '12px'
        }}>
          <YandexMap />
        </Box>
        <Box sx={{ 
          width: '300px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px' 
        }}>
          <LayersControl />
          <MapRoutesList />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <AnimalsList />
            </Grid>
            <Grid item xs={6}>
              <ZoneInfo />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}