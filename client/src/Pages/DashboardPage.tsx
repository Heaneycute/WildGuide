import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { dashboardContainerStyles, dashboardGridStyles, commonBoxStyles, cardsGridStyles, dashboardCardStyles } from '../Styles/DashboardPage.styles';

export default function Dashboard() {
  return (
    <Box sx={dashboardContainerStyles}>
      <Box sx={dashboardGridStyles}>
        {/* Левая панель с картой */}
        <Paper sx={commonBoxStyles}>
          <Typography variant="h4" color="#ffffff">
            Карта
          </Typography>
        </Paper>
        
        {/* Правая панель с карточками */}
        <Box sx={cardsGridStyles}>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Форум
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Общение и обмен опытом
            </Typography>
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Календарь
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              События, встречи, туры
            </Typography>
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Погода
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Прогноз погоды
            </Typography>
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Оружие
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Выбранное оружие и переход в каталог
            </Typography>
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Животные
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Выбранное животное для охоты и следы и проее переход на характеристики
            </Typography>
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Магазин
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Снаряжение аренда обмен и прочее
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}