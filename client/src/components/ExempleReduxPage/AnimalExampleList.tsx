import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { fetchAnimalExampleThunk } from '../../Redux/Thunks/animalExampleThunks';
import { toggleFavorite, setFilters, incrementViews, setSelectedAnimal } from '../../Redux/Slices/animalExampleSlice';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Favorite, FavoriteBorder, LocationOn, Timer } from '@mui/icons-material';

const AnimalExampleList = () => {
  const dispatch = useAppDispatch();
  const { animals, loading, error, filters, selectedAnimal } = useAppSelector((state) => state.animalExample);

  useEffect(() => {
    dispatch(fetchAnimalExampleThunk());
  }, [dispatch]);

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

  const handleAnimalClick = (animal) => {
    dispatch(incrementViews(animal.id));
    dispatch(setSelectedAnimal(animal));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

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
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(toggleFavorite(animal.id));
                    }}
                  >
                    {animal.isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                  </IconButton>
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
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  Просмотров: {animal.views}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AnimalExampleList;