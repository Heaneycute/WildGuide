// src/components/NavBar/Navbar.tsx
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { Dispatch, SetStateAction } from 'react';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { initUser } from '../../App';

type NavbarProps = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export default function Navbar({ user, setUser }: NavbarProps) {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/auth/logout`
    );
    if (response.status === 200) {
      setUser(initUser);
      setAccessToken('');
      navigate('/');
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            На главную
          </Button>
        </Typography>
        <Box>
          {user?.username ? (
            <>
              <Button color="inherit" component={RouterLink} to="/">
                {user.username}
              </Button>
              <Button color="inherit" onClick={logoutHandler}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/signin">
                Войти
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                Регистрация
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}