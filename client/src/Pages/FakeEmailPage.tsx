import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { authPageContainerStyles } from '../Styles/AuthPages.styles';

export default function FakeEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const handleResetPassword = () => {
    navigate(`/newpassword?token=${token}`);
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <EmailIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h1" gutterBottom align="center">
                Тестовое письмо для восстановления пароля
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              Уважаемый пользователь,
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              Вы запросили восстановление пароля. Используйте кнопку ниже для создания нового пароля:
            </Typography>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleResetPassword}
              sx={{ mt: 2, mb: 2 }}
            >
              Восстановить пароль
            </Button>

            <Typography variant="caption" color="text.secondary">
              Это тестовая страница, имитирующая письмо. В продакшене здесь будет настоящая отправка email.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Container>
  );
}