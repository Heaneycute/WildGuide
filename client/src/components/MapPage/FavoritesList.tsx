// FavoritesList.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../Redux/index';
import { selectAllFavorites } from '../../Redux/Slices/MapPage/favoritesSlice';
import { removeFromFavorites, fetchFavorites } from '../../Redux/Thunks/MapPage/favoritesThunks';
import { IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectAllRoutes } from '../../Redux/Slices/MapPage/routesSlice';
import { fetchRoutes } from '../../Redux/Thunks/MapPage/routesThunks';
import { useTheme } from '@mui/material/styles';

const FavoritesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(selectAllFavorites);
  const routes = useSelector(selectAllRoutes);
  const currentTheme = useTheme();

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
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body1">Список избранного пуст</Typography>
      </Paper>
    );
  }

  return (
    <List>
      {favorites.map((item: any) => (
        <ListItem
          key={item.id}
          secondaryAction={
            <IconButton 
              edge="end"
              onClick={() => handleRemoveFromFavorites(item.id.toString())}
              color="error"
              title="Удалить из избранного"
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={getItemContent(item)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default FavoritesList;