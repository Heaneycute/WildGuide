// SignupPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import { Dispatch, SetStateAction } from 'react';
import { User } from '../types';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';

type SignupPageProps = {
  setUser: Dispatch<SetStateAction<User>>
}

export default function SignupPage({ setUser }: SignupPageProps) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API}/auth/signup`,
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
            Регистрация
          </Typography>
          <TextField
            fullWidth
            label="Имя пользователя"
            margin="normal"
            variant="outlined"
          />
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
          >
            Зарегистрироваться
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}