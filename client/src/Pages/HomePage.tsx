import { Container, Typography, Box } from '@mui/material';
import { User } from '../types';

export default function HomePage({ user }: { user: User }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          WildGuide - ВСЕМ ПРИВЕТ. ТУТ Я ХОЧУ ПАЛАРАКС
        </Typography>
      </Box>
    </Container>
  );
}