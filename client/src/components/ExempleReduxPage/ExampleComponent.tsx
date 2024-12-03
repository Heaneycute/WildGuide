//Очень простой компонент который ничего не делает
import { Card, CardContent, Typography } from '@mui/material';

export const ExampleComponent = () => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Статический компонент
        </Typography>
        <Typography>
          Этот компонент демонстрирует разницу между компонентом с Redux и без него.
          Здесь нет управления состоянием или взаимодействия с данными.
        </Typography>
      </CardContent>
    </Card>
  );
};