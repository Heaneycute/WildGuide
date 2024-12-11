import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Stack, Paper } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ThemeContext } from '../../Styles/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllRoutes } from '../../Redux/Slices/MapPage/routesSlice';
import { fetchRoutes } from '../../Redux/Thunks/MapPage/routesThunks';

interface Route {
  id: number;
  name: string;
  description: string;
  distance: number;
  difficulty: string;
  estimatedTime: number;
  season: string;
  waypoints: {
    lat: number;
    lng: number;
    name: string;
  }[];
}

export default function MapRoutesList() {
const dispatch = useDispatch();
const routes = useSelector(selectAllRoutes);

useEffect(() => {
  dispatch(fetchRoutes());
}, [dispatch]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [filterValues, setFilterValues] = useState({
    difficulty: 'all',
    favorite: false,
    season: 'all'
  });
  const { currentTheme } = useContext(ThemeContext);

  const handleFilterChange = (field: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Paper sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflow: 'hidden',
      backgroundColor: currentTheme.palette.background.paper
    }}>
      <Stack spacing={2} direction="column">
        <Typography variant="h5" color={currentTheme.palette.text.primary}>
          Список маршрутов зоны
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            '&:hover': {
              backgroundColor: currentTheme.palette.primary.dark
            }
          }}
        >
          Добавить маршрут
        </Button>

        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel sx={{ color: currentTheme.palette.text.primary }}>Сложность</InputLabel>
            <Select
              value={filterValues.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              sx={{ 
                color: currentTheme.palette.text.primary,
                '& .MuiSelect-icon': { color: currentTheme.palette.text.primary }
              }}
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="easy">Легкая</MenuItem>
              <MenuItem value="medium">Средняя</MenuItem>
              <MenuItem value="hard">Сложная</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel sx={{ color: currentTheme.palette.text.primary }}>Сезон</InputLabel>
            <Select
              value={filterValues.season}
              onChange={(e) => handleFilterChange('season', e.target.value)}
              sx={{ 
                color: currentTheme.palette.text.primary,
                '& .MuiSelect-icon': { color: currentTheme.palette.text.primary }
              }}
            >
              <MenuItem value="all">Все сезоны</MenuItem>
              <MenuItem value="spring">Весна</MenuItem>
              <MenuItem value="summer">Лето</MenuItem>
              <MenuItem value="autumn">Осень</MenuItem>
              <MenuItem value="winter">Зима</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {routes?.map(route => (
          <Paper 
            key={route.id} 
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px',
              borderBottom: `1px solid ${currentTheme.palette.divider}`,
              backgroundColor: currentTheme.palette.background.default,
              '&:hover': {
                backgroundColor: currentTheme.palette.action?.hover
              }
            }}
          >
            <Typography color={currentTheme.palette.text.primary}>
              {route.name} • {route.distance} км
            </Typography>
            <Box>
              <IconButton size="small" sx={{ color: currentTheme.palette.text.primary }}>
                <StarOutlineIcon />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ color: currentTheme.palette.text.primary }}
                onClick={() => setSelectedRoute(route)}
              >
                <InfoOutlinedIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: currentTheme.palette.text.primary }}>
                <CommentOutlinedIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: currentTheme.palette.text.primary }}>
                <EditOutlinedIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}

        <Dialog
          open={Boolean(selectedRoute)}
          onClose={() => setSelectedRoute(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: currentTheme.palette.background.paper,
              backdropFilter: 'blur(10px)',
              color: currentTheme.palette.text.primary
            }
          }}
        >
          {selectedRoute && (
            <>
              <DialogTitle sx={{ borderBottom: `1px solid ${currentTheme.palette.divider}` }}>
                {selectedRoute.name}
                <IconButton 
                  sx={{ 
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: currentTheme.palette.text.primary
                  }}
                >
                  <AddLocationAltIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1" gutterBottom>
                  Длина маршрута: {selectedRoute.distance} км
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Сложность: {selectedRoute.difficulty}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Примерное время: {selectedRoute.estimatedTime} мин
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedRoute.description}
                </Typography>
                
                <Typography variant="h6" gutterBottom>
                  Характеристики маршрута
                </Typography>
                <Typography variant="body1" paragraph>
                  Сезон: {selectedRoute.season}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Ключевые точки
                </Typography>
                {selectedRoute.waypoints?.map((point, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant="subtitle2">
                      {point.name}
                    </Typography>
                    <Typography variant="body2">
                      Координаты: {point.lat}, {point.lng}
                    </Typography>
                  </Box>
                ))}
              </DialogContent>
              <DialogActions sx={{ borderTop: `1px solid ${currentTheme.palette.divider}` }}>
                <Button 
                  onClick={() => setSelectedRoute(null)}
                  sx={{ 
                    color: currentTheme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: currentTheme.palette.action?.hover
                    }
                  }}
                >
                  Закрыть
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Stack>
    </Paper>
  );
}