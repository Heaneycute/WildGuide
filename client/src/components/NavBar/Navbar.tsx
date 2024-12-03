import { AppBar, Toolbar, Button, Typography, Box, IconButton, Menu, MenuItem, Avatar, Stack } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { Dispatch, SetStateAction, useState } from 'react';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { initUser } from '../../App';
import { Home as HomeIcon, Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material';

type NavbarProps = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export default function Navbar({ user, setUser }: NavbarProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

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
        {/* Логотип */}
      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="center" 
        component={RouterLink}
        to="/"
        sx={{ 
          textDecoration: 'none', 
          color: 'inherit',
          mr: 3 
        }}
      >
        <Avatar
          src="/images/logo-default.png"
          sx={{
            width: 40,
            height: 40,
            border: '2px solid',
            borderColor: 'primary.dark'
          }}
        />
        <Typography
          variant="h6"
          component="span"
          sx={{
            fontWeight: 'bold',
            display: { xs: 'none', sm: 'block' }
          }}
        >
          WildGuide
        </Typography>
      </Stack>
        {/* Иконка домой */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          component={RouterLink}
          to="/"
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>

        {/* Навигационные кнопки */}
        <Box sx={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/Dashboard"
          >
            DashBord
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/animal"
          >
            Animal
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/calendar"
          >
            Calendar
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/map"
          >
            Map
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/weapon"
          >
            Weapon
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/exemplereduxpage"
          >
            ExempleReduxPage
          </Button>
        </Box>

        {/* Пользовательское меню */}
        <Box>
          {user?.username ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="subtitle1" color="inherit">
                {user.username}
              </Typography>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
                sx={{ p: 0.5 }}
              >
                <Avatar 
                  src="/images/avatar-default.jpg" 
                  alt={user.username}
                  sx={{ 
                    width: 40, 
                    height: 40,
                    bgcolor: 'secondary.main'
                  }}
                >
                  <PersonIcon />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfile}>Профиль</MenuItem>
              </Menu>
              <IconButton
                color="inherit"
                onClick={logoutHandler}
                sx={{ ml: 1 }}
              >
                <LogoutIcon />
              </IconButton>
            </Stack>
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