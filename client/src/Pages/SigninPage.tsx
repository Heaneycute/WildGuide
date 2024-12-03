// SigninPage.tsx
import { Dispatch, SetStateAction } from 'react';
import { User } from '../types';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';

type SigninPageProps = {
  setUser: Dispatch<SetStateAction<User>>
}

export default function SigninPage({ setUser }: SigninPageProps) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Вход
          </Typography>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            margin="normal"
            variant="outlined"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {/* Добавить обработку входа */}}
          >
            Войти
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}