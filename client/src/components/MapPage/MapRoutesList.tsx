import React, { useState } from 'react';
import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { commonBoxStyles } from '../../Styles/MapPageComponents.styles';

// Mock data for routes
const mockRoutes = {
  routes: [
    {
      id: 1,
      name: "Северный маршрут",
      length: "5.2 км",
      difficulty: "средняя",
      duration: "2-3 часа",
      description: "Живописный маршрут через смешанный лес с выходом к озеру",
      terrain: "Холмистая местность, лесные тропы",
      seasonality: "Весна-Осень",
      points: [
        {
          name: "Начало маршрута",
          coordinates: [55.123, 37.456],
          description: "Парковка у входа в охотничьи угодья"
        },
        {
          name: "Смотровая площадка",
          coordinates: [55.125, 37.458],
          description: "Вышка с видом на долину"
        },
        {
          name: "Привал",
          coordinates: [55.127, 37.460],
          description: "Оборудованное место отдыха"
        }
      ],
      warnings: [
        "Крутой подъем на участке 2-3 км",
        "Заболоченность в весенний период"
      ],
      recommendations: [
        "Треккинговая обувь",
        "Запас воды",
        "Средства от насекомых"
      ]
    },
    {
      id: 2,
      name: "Озерный круг",
      length: "3.8 км",
      difficulty: "легкая",
      duration: "1-2 часа",
      description: "Кольцевой маршрут вокруг озера с местами для наблюдения за водоплавающей дичью",
      terrain: "Равнинная местность",
      seasonality: "Круглый год",
      points: [
        {
          name: "Стартовая точка",
          coordinates: [55.130, 37.465],
          description: "Информационный стенд"
        },
        {
          name: "Укрытие",
          coordinates: [55.132, 37.467],
          description: "Скрадок для наблюдения за птицами"
        }
      ],
      warnings: [
        "Скользкая тропа после дождя"
      ],
      recommendations: [
        "Бинокль",
        "Фотоаппарат",
        "Дождевик"
      ]
    }
  ]
};

// Component for displaying route list
export default function MapRoutesList() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [filterValues, setFilterValues] = useState({
    difficulty: 'all',
    favorite: false,
    season: 'all'
  });

  const handleFilterChange = (field, value) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={commonBoxStyles}>
    <Stack spacing={2} direction="column">

    </Stack>
      <Stack spacing={2} direction="column" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" color="#ffffff">
          Список маршрутов зоны
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#7C984E',
            '&:hover': {
              backgroundColor: '#647a3f'
            }
          }}
        >
          Добавить маршрут
        </Button>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth sx={{ mb: 1 }}>
          <InputLabel sx={{ color: '#ffffff' }}>Сложность</InputLabel>
          <Select
            value={filterValues.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            sx={{ color: '#ffffff', '& .MuiSelect-icon': { color: '#ffffff' } }}
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="easy">Легкая</MenuItem>
            <MenuItem value="medium">Средняя</MenuItem>
            <MenuItem value="hard">Сложная</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 1 }}>
          <InputLabel sx={{ color: '#ffffff' }}>Сезон</InputLabel>
          <Select
            value={filterValues.season}
            onChange={(e) => handleFilterChange('season', e.target.value)}
            sx={{ color: '#ffffff', '& .MuiSelect-icon': { color: '#ffffff' } }}
          >
            <MenuItem value="all">Все сезоны</MenuItem>
            <MenuItem value="spring">Весна</MenuItem>
            <MenuItem value="summer">Лето</MenuItem>
            <MenuItem value="autumn">Осень</MenuItem>
            <MenuItem value="winter">Зима</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Route list with icons */}
      {mockRoutes.routes.map(route => (
        <Box key={route.id} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }
        }}>
          <Typography color="#ffffff">
            {route.name} • {route.length}
          </Typography>
          <Box>
            <IconButton size="small" sx={{ color: '#ffffff' }}>
              <StarOutlineIcon />
            </IconButton>
            <IconButton 
              size="small" 
              sx={{ color: '#ffffff' }}
              onClick={() => setSelectedRoute(route)}
            >
              <InfoOutlinedIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: '#ffffff' }}>
              <CommentOutlinedIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: '#ffffff' }}>
              <EditOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      ))}

      {/* Route details dialog */}
      <Dialog
        open={Boolean(selectedRoute)}
        onClose={() => setSelectedRoute(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff'
          }
        }}
      >
        {selectedRoute && (
          <>
            <DialogTitle>
              {selectedRoute.name}
              <IconButton 
                sx={{ 
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: '#ffffff'
                }}
              >
                <AddLocationAltIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" gutterBottom>
                Длина: {selectedRoute.length}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Сложность: {selectedRoute.difficulty}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Время прохождения: {selectedRoute.duration}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedRoute.description}
              </Typography>
              
              <Typography variant="h6" gutterBottom>
                Характеристики маршрута
              </Typography>
              <Typography variant="body1" paragraph>
                Тип местности: {selectedRoute.terrain}
              </Typography>
              <Typography variant="body1" paragraph>
                Сезонность: {selectedRoute.seasonality}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Ключевые точки
              </Typography>
              {selectedRoute.points.map((point, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">
                    {point.name}
                  </Typography>
                  <Typography variant="body2">
                    {point.description}
                  </Typography>
                </Box>
              ))}

              <Typography variant="h6" gutterBottom>
                Предупреждения
              </Typography>
              {selectedRoute.warnings.map((warning, index) => (
                <Typography key={index} variant="body1">
                  • {warning}
                </Typography>
              ))}

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Рекомендации
              </Typography>
              {selectedRoute.recommendations.map((rec, index) => (
                <Typography key={index} variant="body1">
                  • {rec}
                </Typography>
              ))}
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => setSelectedRoute(null)}
                sx={{ color: '#ffffff' }}
              >
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      </Stack>

    </Box>
  );
}