// SignupPage.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import { Dispatch, SetStateAction } from 'react';
import { authPageContainerStyles } from '../Styles/AuthPages.styles';
import { User } from '../types';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert, 
  Snackbar,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import { 
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
  GitHub,
  Email,
  Google
} from '@mui/icons-material';

type SignupPageProps = {
  setUser: Dispatch<SetStateAction<User>>
}

export default function SignupPage({ setUser }: SignupPageProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success'
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username) {
      newErrors.username = 'Имя пользователя обязательно';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Имя пользователя должно быть не менее 3 символов';
    }

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен быть не менее 8 символов';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Пароль должен содержать заглавные и строчные буквы, и цифры';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API}/auth/signup`,
        formData
      );
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      setSnackbar({
        open: true,
        message: 'Регистрация успешна!',
        severity: 'success'
      });
      navigate('/');
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Ошибка регистрации',
        severity: 'error'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSocialSignup = (provider: string) => {
    // Implement social signup logic here
    console.log(`Signing up with ${provider}`);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{
      ...authPageContainerStyles,
      minHeight: '100vh',
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
            <Typography variant="h5" component="h1" gutterBottom align="center">
              Регистрация
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Имя пользователя"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                error={!!errors.username}
                helperText={errors.username || 'Минимум 3 символа'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                error={!!errors.email}
                helperText={errors.email || 'Введите ваш email'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Пароль"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                error={!!errors.password}
                helperText={errors.password || 'Минимум 8 символов, заглавные и строчные буквы, цифры'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Подтвердите пароль"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword || 'Повторите пароль'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Зарегистрироваться
              </Button>
              
              <Typography align="center" variant="body2">
                Уже есть аккаунт?{' '}
                <Button
                  component={Link}
                  to="/signin"
                  color="primary"
                >
                  Войдите
                </Button>
              </Typography>
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
    </Container>
  );
}