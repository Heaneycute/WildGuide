// SigninPage.tsx
import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import { User } from '../types';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';

type SigninPageProps = {
  setUser: Dispatch<SetStateAction<User>>
}

export default function SigninPage({ setUser }: SigninPageProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API}/auth/signin`,
        formData
      );
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

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