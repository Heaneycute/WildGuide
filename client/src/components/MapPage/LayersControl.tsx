import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux';
import { toggleLayer } from '../../Redux/Slices/layersSlice';
import { clearSelectedArea } from '../../Redux/Slices/MapPage/huntingAreasSlice';
import { Box, Card, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import {
  TerrainRounded,
  PetsRounded,
  CabinRounded,
  LocationOnRounded,
} from '@mui/icons-material';
import { useContext } from 'react';
import { ThemeContext } from '../../Styles/ThemeContext';

interface LayersState {
  hunting: boolean;
  animals: boolean;
  cabins: boolean;
  trails: boolean;
  points: boolean;
}

export default function LayersControl() {
  const { currentTheme } = useContext(ThemeContext);
  const layers = useSelector((state: RootState) => state.layers);
  const dispatch = useDispatch();

  const handleLayerToggle = (layer: keyof LayersState) => {
    dispatch(toggleLayer(layer));
  };

  const controlStyles = {
    minWidth: '180px',
    borderRadius: '8px',
    padding: '8px 16px',
    margin: '4px',
    transition: 'all 0.3s ease',
    backgroundColor: currentTheme.palette.background.paper,
    '&:hover': {
      backgroundColor: currentTheme.palette.action?.hover
    },
    userSelect: 'none'
  };

  const containerStyles = {
    padding: '10px',
    height: 'auto',
    minHeight: '80px',
    backdropFilter: 'blur(10px)',
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(clearSelectedArea());
    }
  };

  return (
    <Card sx={containerStyles} onClick={handleBackgroundClick}>
      <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, justifyContent: 'flex-start' }}>
        <Card elevation={3} sx={controlStyles}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={layers.hunting}
                onChange={() => handleLayerToggle('hunting')}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', color: currentTheme.palette.text.primary }}>
                <TerrainRounded sx={{ mr: 1 }} />
                Зоны охоты
              </Box>
            }
          />
        </Card>
        <Card elevation={3} sx={controlStyles}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={layers.points}
                onChange={() => handleLayerToggle('points')}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', color: currentTheme.palette.text.primary }}>
                <LocationOnRounded sx={{ mr: 1 }} />
                Названия зон
              </Box>
            }
          />
        </Card>
        <Card elevation={3} sx={controlStyles}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={layers.animals}
                onChange={() => handleLayerToggle('animals')}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', color: currentTheme.palette.text.primary }}>
                <PetsRounded sx={{ mr: 1 }} />
                Животные и миграции
              </Box>
            }
          />
        </Card>
        <Card elevation={3} sx={controlStyles}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={layers.cabins}
                onChange={() => handleLayerToggle('cabins')}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', color: currentTheme.palette.text.primary }}>
                <CabinRounded sx={{ mr: 1 }} />
                Охотничьи домики
              </Box>
            }
          />
        </Card>
        <Card elevation={3} sx={controlStyles}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={layers.trails}
                onChange={() => handleLayerToggle('trails')}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', color: currentTheme.palette.text.primary }}>
                Тропы и маршруты
              </Box>
            }
          />
        </Card>
      </FormGroup>
    </Card>
  );
}