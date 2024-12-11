import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../Redux/index';
import { selectAllFavorites } from '../../Redux/Slices/MapPage/favoritesSlice';
import { removeFromFavorites, fetchFavorites } from '../../Redux/Thunks/MapPage/favoritesThunks';
import { IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectAllRoutes } from '../../Redux/Slices/MapPage/routesSlice';
import { fetchRoutes } from '../../Redux/Thunks/MapPage/routesThunks';
import { ThemeContext } from '../../Styles/ThemeContext';

const commonBoxStyles = {
  padding: '16px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const FavoritesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(selectAllFavorites);
  const routes = useSelector(selectAllRoutes);
  const { currentTheme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(fetchRoutes());
  }, [dispatch]);

  const handleRemoveFromFavorites = async (itemId: string) => {
    try {
      await dispatch(removeFromFavorites(itemId)).unwrap();
      console.log('Успешно удалено из избранного');
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
    }
  };

  const getItemContent = (item: any) => {
    if (item.itemType === 'route') {
      const route = routes.find(r => r.id === item.itemId);
      if (route) {
        return (
          <>
            <Typography color={currentTheme.palette.text.primary}>
              {route.name} • {route.distance} км
            </Typography>
            <Typography variant="caption" display="block">
              Добавлено: {new Date(item.dateAdded).toLocaleDateString()}
            </Typography>
          </>
        );
      }
    }
    return null;
  };

  if (!favorites.length) {
    return (
      <Paper sx={{
        ...commonBoxStyles,
        backgroundColor: currentTheme.palette.background.paper
      }}>
        <Typography 
          variant="body1" 
          color={currentTheme.palette.text.primary}
        >
          Список избранного пуст
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{
      ...commonBoxStyles,
      backgroundColor: currentTheme.palette.background.paper,
      height: '300px',
      width: '100%'
    }}>
      <List sx={{
        height: '100%',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px'
        },
        '&::-webkit-scrollbar-track': {
          background: currentTheme.palette.action?.hover
        },
        '&::-webkit-scrollbar-thumb': {
          background: currentTheme.palette.action?.selected,
          borderRadius: '4px'
        }
      }}>
        {favorites.map((item: any) => (
          <ListItem
            key={item.id}
            sx={{
              '&:hover': {
                bgcolor: currentTheme.palette.action?.hover
              },
              borderRadius: 1,
              mb: 1
            }}
            secondaryAction={
              <IconButton 
                edge="end"
                onClick={() => handleRemoveFromFavorites(item.id.toString())}
                sx={{ color: currentTheme.palette.error.main }}
                title="Удалить из избранного"
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={getItemContent(item)}
              sx={{ color: currentTheme.palette.text.primary }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FavoritesList;