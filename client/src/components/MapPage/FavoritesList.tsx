import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../Redux/index';
import { selectAllFavorites } from '../../Redux/Slices/MapPage/favoritesSlice';
import { removeFromFavorites, fetchFavorites } from '../../Redux/Thunks/MapPage/favoritesThunks';
import { IconButton, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FavoritesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(selectAllFavorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemoveFromFavorites = async (itemId: string) => {
    try {
      await dispatch(removeFromFavorites(itemId)).unwrap();
      console.log('Успешно удалено из избранного');
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
    }
  };

  const getItemTitle = (item: any) => {
    switch (item.itemType) {
      case 'area':
        return 'Охотничья зона';
      case 'route':
        return 'Маршрут';
      case 'cabin':
        return 'Охотничий домик';
      case 'animal':
        return 'Животное';
      case 'weapon':
        return `Оружие ${item.weaponType ? `(${item.weaponType})` : ''}`;
      default:
        return 'Элемент избранного';
    }
  };
  
  if (!favorites.length) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body1">Список избранного пуст</Typography>
      </Box>
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
            primary={getItemTitle(item)}
            secondary={
              <>
                <Typography variant="caption" display="block">
                  Добавлено: {new Date(item.dateAdded).toLocaleDateString()}
                </Typography>
                {item.notes && (
                  <Typography variant="body2" color="text.secondary">
                    {item.notes}
                  </Typography>
                )}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default FavoritesList;