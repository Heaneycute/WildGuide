//Пример страницы с экземплярами
import { Container, Typography, Box, Stack } from '@mui/material';
import AnimalExampleList from '../components/ExempleReduxPage/AnimalExampleList';
import CollorExampleCard from '../components/ExempleReduxPage/CollorExampleCard';
import { ExampleComponent } from '../components/ExempleReduxPage/ExampleComponent';
import { User } from '../types';

type NavbarProps = {
    user: User;
};

export default function ExempleReduxPage({ user }: NavbarProps) {
  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <Typography variant="h4" component="h1">
          Привет дорогой, {user.username}
        </Typography>
        <Typography>
          Пример функционала Redux
        </Typography>
        <AnimalExampleList />
        <Typography>
          Пример функционала Redux
        </Typography>
        <CollorExampleCard />
        <ExampleComponent />
      </Stack>
    </Container>
  );
}