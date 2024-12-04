import { Container, Typography, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnimalExampleList from '../components/ExempleReduxPage/AnimalExampleList';
import CollorExampleCard from '../components/ExempleReduxPage/CollorExampleCard';
import { ExampleComponent } from '../components/ExempleReduxPage/ExampleComponent';
import { User } from '../types';

const WelcomePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #7C984E 0%, #47493B 100%)',
  borderRadius: theme.spacing(2),
  color: '#ffffff',
  marginBottom: theme.spacing(4),
}));

type NavbarProps = {
  user?: User;
};

export default function ExempleReduxPage({ user }: NavbarProps) {
  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <WelcomePaper elevation={3}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', mb: 1 }}
        >
          {user && user.username ? 
            `С возвращением, ${user.username}! 🎯` : 
            'Добро пожаловать в WildGuide! 🌲'
          }
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          {user && user.username ? 
            'Рады видеть вас снова в нашем сообществе охотников' :
            'Присоединяйтесь к сообществу охотников - авторизуйтесь или зарегистрируйтесь'
          }
        </Typography>
        </WelcomePaper>
        <Typography variant="h5" sx={{ color: '#47493B', mb: 2 }}>
          Примеры функционала Redux
        </Typography>
        <AnimalExampleList />
        <CollorExampleCard />
        <ExampleComponent />
      </Stack>
    </Container>
  );
}