import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { fetchAnimalExampleThunk } from '../../Redux/Thunks/animalExampleThunks';
import { Box, Card, CardContent, Typography, Grid as Grid2 } from '@mui/material';

const AnimalExampleList = () => {
  const dispatch = useAppDispatch();
  const { animals, loading, error } = useAppSelector((state) => state.animalExample);

  useEffect(() => {
    dispatch(fetchAnimalExampleThunk());
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Список животных (Пример Redux)</Typography>
      <Grid2 container spacing={2}>
        {animals.map((animal) => (
          <Grid2 item xs={12} sm={6} md={4} key={animal.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{animal.name}</Typography>
                <Typography color="textSecondary">{animal.species}</Typography>
                <Typography variant="body2">{animal.description}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default AnimalExampleList;