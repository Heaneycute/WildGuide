import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Stack, Paper } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import StarIcon from '@mui/icons-material/Star';
import { ThemeContext } from '../../Styles/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllRoutes } from '../../Redux/Slices/MapPage/routesSlice';
import { selectAllFavorites } from '../../Redux/Slices/MapPage/favoritesSlice';
import { fetchRoutes } from '../../Redux/Thunks/MapPage/routesThunks';
import { FavoriteStar } from './FavoriteStar';

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
  const favorites = useSelector(selectAllFavorites);
  const { currentTheme } = useContext(ThemeContext);
  const accessToken = localStorage.getItem('accessToken');
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [filterValues, setFilterValues] = useState({ difficulty: 'all', favorite: false, season: 'all'});
  const [showFavoritesFirst, setShowFavoritesFirst] = useState(false);

  useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  const handleFilterChange = (field: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredRoutes = routes?.filter(route => {
    const matchesDifficulty = filterValues.difficulty === 'all' || route.difficulty === filterValues.difficulty;
    const matchesSeason = filterValues.season === 'all' || route.season === filterValues.season;
    return matchesDifficulty && matchesSeason;
  });

  const sortedAndFilteredRoutes = filteredRoutes?.sort((a, b) => {
    const aIsFavorite = favorites.some(fav => 
      fav.itemType === 'route' && fav.itemId === a.id
    );
    const bIsFavorite = favorites.some(fav => 
      fav.itemType === 'route' && fav.itemId === b.id
    );
    
    if (showFavoritesFirst) {
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
    }
    
    return a.name.localeCompare(b.name);
  });

  return (
    <Paper sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '20px',
      overflow: 'hidden',
      backgroundColor: currentTheme.palette.background.paper
    }}>
      <Stack spacing={2} direction="column" sx={{ width: '100%' }}>
        <Typography variant="h5" color={currentTheme.palette.text.primary}>
          Список маршрутов
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <IconButton 
              onClick={() => setShowFavoritesFirst(!showFavoritesFirst)}
              sx={{ 
                color: showFavoritesFirst ? '#ff4444' : currentTheme.palette.text.primary,
                mr: 2 
              }}
            >
              <StarIcon />
            </IconButton>
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
          </Box>

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
              <MenuItem value="fall">Осень</MenuItem>
              <MenuItem value="зима">Зима</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {sortedAndFilteredRoutes?.map(route => (
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
            <FavoriteStar routeId={route.id} />
              <IconButton 
                size="small" 
                sx={{ color: currentTheme.palette.text.primary }}
                onClick={() => setSelectedRoute(route)}
              >
                <InfoOutlinedIcon />
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