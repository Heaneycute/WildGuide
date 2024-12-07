import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux';
import { toggleLayer } from '../../Redux/Slices/layersSlice';
import { clearSelectedArea } from '../../Redux/Slices/MapPage/huntingAreasSlice';
import { Box, FormGroup, FormControlLabel, Checkbox, Paper } from '@mui/material';
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

  const controlStyles = {
    minWidth: '180px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '8px 16px',
    margin: '4px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    userSelect: 'none'
  };

  const containerStyles = {
    ...commonBoxStyles,
    padding: '10px',
    height: 'auto',
    minHeight: '80px',
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Проверяем, что клик был именно по фону (Box), а не по его дочерним элементам
    if (e.target === e.currentTarget) {
      dispatch(clearSelectedArea());
    }
  };

  return (
    <Box sx={containerStyles} onClick={handleBackgroundClick}>
      <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, justifyContent: 'flex-start' }}>
        <Paper elevation={3} sx={controlStyles}>
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
        </Paper>
        <Paper elevation={3} sx={controlStyles}>
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
        </Paper>
        <Paper elevation={3} sx={controlStyles}>
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
        </Paper>
        <Paper elevation={3} sx={controlStyles}>
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
        </Paper>
        <Paper elevation={3} sx={controlStyles}>
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
        </Paper>
      </FormGroup>
    </Box>
  );
}