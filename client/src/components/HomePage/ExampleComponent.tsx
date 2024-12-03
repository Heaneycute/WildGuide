import { Card, CardContent, Typography } from '@mui/material';

export const ExampleComponent = () => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Пример простого компонента
        </Typography>
        <Typography>
          Этот компонент не использует Redux и просто отображает статический контент
        </Typography>
      </CardContent>
    </Card>
  );
};