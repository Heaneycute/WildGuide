import React from 'react';
import { Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { commonBoxStyles } from '../../Styles/MapPageComponents.styles';
import {
  TerrainRounded,
  PetsRounded,
  CabinRounded,
  LocationOnRounded,
} from '@mui/icons-material';

interface LayersControlProps {
  layers: {
    hunting: boolean;
    animals: boolean;
    cabins: boolean;
    trails: boolean;
    points: boolean;
  };
  onLayerToggle: (layer: string) => void;
}

export default function LayersControl({ layers, onLayerToggle }: LayersControlProps) {
  return (
    <Box sx={commonBoxStyles}>
      <FormGroup sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <FormControlLabel
          control={<Checkbox checked={layers.hunting} onChange={() => onLayerToggle('hunting')} />}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <TerrainRounded sx={{ mr: 1 }} />
              Зоны охоты
            </Box>
          }
        />
        <FormControlLabel
          control={<Checkbox checked={layers.points} onChange={() => onLayerToggle('points')} />}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <LocationOnRounded sx={{ mr: 1 }} />
              Названия зон
            </Box>
          }
        />
        <FormControlLabel
          control={<Checkbox checked={layers.animals} onChange={() => onLayerToggle('animals')} />}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <PetsRounded sx={{ mr: 1 }} />
              Животные и миграции
            </Box>
          }
        />
        <FormControlLabel
          control={<Checkbox checked={layers.cabins} onChange={() => onLayerToggle('cabins')} />}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <CabinRounded sx={{ mr: 1 }} />
              Охотничьи домики
            </Box>
          }
        />
        <FormControlLabel
          control={<Checkbox checked={layers.trails} onChange={() => onLayerToggle('trails')} />}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              Тропы и маршруты
            </Box>
          }
        />
      </FormGroup>
    </Box>
  );
}