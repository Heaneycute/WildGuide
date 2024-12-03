import { Container, Typography, Box } from '@mui/material';
import AnimalExampleList from '../components/HomePage/AnimalExampleList';
import { ExampleComponent } from '../components/HomePage/ExampleComponent';
import { User } from '../types';

export default function HomePage({ user }: { user: User }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          WildGuide
        </Typography>
        <AnimalExampleList />
        <ExampleComponent />
      </Box>
    </Container>
  );
}