import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux';
import { toggleLayer } from '../../Redux/Slices/layersSlice';
import { Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { commonBoxStyles } from '../../Styles/MapPageComponents.styles';
import {
  TerrainRounded,
  PetsRounded,
  CabinRounded,
  LocationOnRounded,
} from '@mui/icons-material';

interface LayersState {
  hunting: boolean;
  animals: boolean;
  cabins: boolean;
  trails: boolean;
  points: boolean;
}

export default function LayersControl() {
  const layers = useSelector((state: RootState) => state.layers);
  const dispatch = useDispatch();

  const handleLayerToggle = (layer: keyof LayersState) => {
    dispatch(toggleLayer(layer));
  };

  return (
    <Box sx={commonBoxStyles}>
      <FormGroup sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={layers.hunting}
              onChange={() => handleLayerToggle('hunting')}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <TerrainRounded sx={{ mr: 1 }} />
              Зоны охоты
            </Box>
          }
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={layers.points}
              onChange={() => handleLayerToggle('points')}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <LocationOnRounded sx={{ mr: 1 }} />
              Названия зон
            </Box>
          }
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={layers.animals}
              onChange={() => handleLayerToggle('animals')}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <PetsRounded sx={{ mr: 1 }} />
              Животные и миграции
            </Box>
          }
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={layers.cabins}
              onChange={() => handleLayerToggle('cabins')}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <CabinRounded sx={{ mr: 1 }} />
              Охотничьи домики
            </Box>
          }
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={layers.trails}
              onChange={() => handleLayerToggle('trails')}
            />
          }
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