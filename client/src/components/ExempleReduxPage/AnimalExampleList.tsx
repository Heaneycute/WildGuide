//Компоненет который работает через Redux, работает с БД, редактирует, обновляется, собирает статистику и так далее.

import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { fetchAnimalExampleThunk, updateAnimalThunk } from '../../Redux/Thunks/animalExampleThunks';
import { toggleFavorite, setFilters, incrementViews } from '../../Redux/Slices/animalExampleSlice';
import { AnimalExample } from '../../types/animalExample';
import axiosInstance from '../../axiosInstance';
import {
  Box, Card, CardContent, Typography, Grid, IconButton,
  Chip, FormControl, InputLabel, Select, MenuItem,
  Switch, FormControlLabel, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Button
} from '@mui/material';
import { Favorite, FavoriteBorder, LocationOn, Timer, Edit, Visibility } from '@mui/icons-material';

const AnimalExampleList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { animals, filters } = useAppSelector((state) => state.animalExample);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<AnimalExample | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAnimalExampleThunk());
  }, [dispatch]);

  const validateAnimal = (animal: AnimalExample): boolean => {
    const errors: Record<string, string> = {};
    
    if (!animal.name?.trim()) {
      errors.name = 'Название обязательно';
    }
    if (!animal.description?.trim()) {
      errors.description = 'Описание обязательно';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAnimalClick = async (animal: AnimalExample) => {
    try {
      await axiosInstance.post(
        `${import.meta.env.VITE_API}/animals-example/${animal.id}/view`
      );
      dispatch(incrementViews(animal.id));
    } catch (error) {
      console.error('Error updating views:', error);
    }
  };

  const handleEditClick = (e: React.MouseEvent, animal: AnimalExample) => {
    e.stopPropagation();
    setEditingAnimal(animal);
    setEditModalOpen(true);
  };

  const handleFavoriteClick = async (e: React.MouseEvent, animal: AnimalExample) => {
    e.stopPropagation();
    try {
      const updatedAnimal = { ...animal, isFavorite: !animal.isFavorite };
      await dispatch(updateAnimalThunk(updatedAnimal)).unwrap();
      dispatch(toggleFavorite(animal.id));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingAnimal) return;

    if (!validateAnimal(editingAnimal)) {
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(updateAnimalThunk(editingAnimal)).unwrap();
      setEditModalOpen(false);
      setEditingAnimal(null);
      setValidationErrors({});
    } catch (error) {
      console.error('Error saving animal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEditModalOpen(false);
    setEditingAnimal(null);
    setValidationErrors({});
  };

  const uniqueSpecies = useMemo(() => 
    [...new Set(animals.map(animal => animal.species))],
    [animals]
  );

  const filteredAnimals = useMemo(() => {
    return animals.filter(animal => {
      if (filters.species && animal.species !== filters.species) return false;
      if (filters.favorite && !animal.isFavorite) return false;
      if (filters.season) {
        const now = new Date();
        const start = new Date(animal.huntingSeason.start);
        const end = new Date(animal.huntingSeason.end);
        if (now < start || now > end) return false;
      }
      return true;
    });
  }, [animals, filters]);

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Вид животного</InputLabel>
          <Select
            value={filters.species || ''}
            onChange={(e) => dispatch(setFilters({ species: e.target.value || null }))}
          >
            <MenuItem value="">Все</MenuItem>
            {uniqueSpecies.map((species) => (
              <MenuItem key={species} value={species}>{species}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={filters.favorite}
              onChange={(e) => dispatch(setFilters({ favorite: e.target.checked }))}
            />
          }
          label="Только избранные"
        />
        <FormControlLabel
          control={
            <Switch
              checked={filters.season}
              onChange={(e) => dispatch(setFilters({ season: e.target.checked }))}
            />
          }
          label="Открытый сезон"
        />
      </Box>

      <Grid container spacing={2}>
        {filteredAnimals.map((animal) => (
          <Grid item xs={12} sm={6} md={4} key={animal.id}>
            <Card 
              sx={{ cursor: 'pointer' }}
              onClick={() => handleAnimalClick(animal)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">{animal.name}</Typography>
                  <Box>
                    <IconButton
                      onClick={(e) => handleFavoriteClick(e, animal)}
                    >
                      {animal.isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                    <IconButton
                      onClick={(e) => handleEditClick(e, animal)}
                    >
                      <Edit />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary">{animal.species}</Typography>
                <Typography variant="body2">{animal.description}</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Chip
                    icon={<LocationOn />}
                    label={animal.location.region}
                    size="small"
                  />
                  <Chip
                    icon={<Timer />}
                    label={`${new Date(animal.huntingSeason.start).toLocaleDateString()} - ${new Date(animal.huntingSeason.end).toLocaleDateString()}`}
                    size="small"
                  />
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    mt: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5,
                    color: 'primary.main' 
                  }}
                >
                  <Visibility sx={{ fontSize: 16, color: 'primary.main' }} />
                  {animal.views}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={editModalOpen} onClose={handleClose}>
        <DialogTitle>Редактировать информацию</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Название"
            value={editingAnimal?.name || ''}
            onChange={(e) => setEditingAnimal({...editingAnimal!, name: e.target.value})}
            error={!!validationErrors.name}
            helperText={validationErrors.name}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Описание"
            multiline
            rows={4}
            value={editingAnimal?.description || ''}
            onChange={(e) => setEditingAnimal({...editingAnimal!, description: e.target.value})}
            error={!!validationErrors.description}
            helperText={validationErrors.description}
            disabled={isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button onClick={handleSaveEdit} variant="contained" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AnimalExampleList;