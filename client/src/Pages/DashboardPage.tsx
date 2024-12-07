import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { commonBoxStyles } from '../Styles/MapPageComponents.styles';


interface DashboardCardProps {
  title: string;
  description: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description }) => {
  return (
    <Paper 
      sx={{
        ...commonBoxStyles,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '24px',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
        }
      }}
    >
      <Typography variant="h6" color="#ffffff" align="center">
        {title}
      </Typography>
      <Typography variant="body2" color="#ffffff" align="center">
        {description}
      </Typography>
    </Paper>
  );
};

export default function Dashboard() {
  return (
    <Box sx={{
      position: 'relative',
      width: '100vw',
      height: 'calc(100vh - 60px)',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("/images/nature-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.8)',
        zIndex: -1
      }
    }}>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        padding: '24px',
        height: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Левая панель с картой */}
        <Paper sx={{
          ...commonBoxStyles,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant="h4" color="#ffffff">
            Карта
          </Typography>
        </Paper>

        {/* Правая панель с карточками */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridAutoRows: '1fr',
          gap: '16px',
          height: '100%'
        }}>
          <DashboardCard 
            title="Форум" 
            description="Общение и обмен опытом"
          />
          <DashboardCard 
            title="Календарь"
            description="События, встречи, туры"
          />
          <DashboardCard 
            title="Погода"
            description="Прогноз погоды"
          />
          <DashboardCard 
            title="Оружие"
            description="Выбранное оружие и переход в каталог"
          />
          <DashboardCard 
            title="Животные"
            description="Выбранное животное для охоты и следы и проее переход на характеристики"
          />
          <DashboardCard 
            title="Магазин"
            description="Снаряжение аренда обмен и прочее"
          />
        </Box>
      </Box>
    </Box>
  );
}