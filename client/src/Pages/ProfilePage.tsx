// src/pages/Profile.tsx
import { Container, Typography, Box, Paper } from '@mui/material';
import { User } from '../types';

type ProfileProps = {
  user: User;
};

export default function Profile({ user }: ProfileProps) {
  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Профиль пользователя
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {user.username}
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          Здесь будет размещена информация о пользователе...
        </Typography>
      </Paper>
    </Container>
  );
}