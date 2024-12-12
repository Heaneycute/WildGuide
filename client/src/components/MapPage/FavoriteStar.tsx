// src/components/MapPage/FavoriteStar.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { addToFavorites, removeFromFavorites } from '../../Redux/Thunks/MapPage/favoritesThunks';
import { selectAllFavorites } from '../../Redux/Slices/MapPage/favoritesSlice';

interface FavoriteStarProps {
  routeId: string;
}

export const FavoriteStar: React.FC<FavoriteStarProps> = ({ routeId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectAllFavorites);
  
  const isFavorite = favorites.some(fav => 
    fav.itemType === 'route' && fav.itemId === routeId
  );

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      const favoriteItem = favorites.find(fav => 
        fav.itemType === 'route' && fav.itemId === routeId
      );
      if (favoriteItem) {
        await dispatch(removeFromFavorites(favoriteItem.id));
      }
    } else {
      const favoriteData = {
        itemType: 'route',
        itemId: routeId,
        dateAdded: new Date().toISOString()
      };
      await dispatch(addToFavorites(favoriteData));
    }
  };

  return (
    <IconButton 
      size="small"
      onClick={handleToggleFavorite}
    >
      {isFavorite ? 
        <StarIcon sx={{ color: '#ff4444' }}/> : 
        <StarOutlineIcon />
      }
    </IconButton>
  );
};