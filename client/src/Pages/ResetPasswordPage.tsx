// ResetPasswordPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert, Snackbar } from '@mui/material';
import axiosInstance from '../axiosInstance';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email обязателен');
      return;
    }
    
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError('Введите корректный email адрес');
      return;
    }

    try {
      await axiosInstance.post(`${import.meta.env.VITE_API}/auth/reset-password`, { email });
      setSnackbar({
        open: true,
        message: 'Инструкции по восстановлению пароля отправлены на ваш email',
        severity: 'success'
      });
      setIsSubmitted(true);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Ошибка восстановления пароля',
        severity: 'error'
      });
    }
  };

  const handleNewPassword = () => {
    navigate('/newpassword');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Восстановление пароля
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }} align="center">
            Введите ваш email для получения инструкций по восстановлению пароля
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              margin="normal"
              variant="outlined"
              required
              error={!!error}
              helperText={error || 'Введите email, указанный при регистрации'}
            />
            <Button
              type={isSubmitted ? "button" : "submit"}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={isSubmitted ? handleNewPassword : undefined}
            >
              {isSubmitted ? 'Сменить пароль' : 'Отправить'}
            </Button>
          </form>
        </Paper>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}