import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedArea } from '../Redux/Slices/MapPage/huntingAreasSlice';
import { Box, Typography, Paper, Button } from '@mui/material';
import { dashboardContainerStyles, dashboardGridStyles, commonBoxStyles, cardsGridStyles, dashboardCardStyles } from '../Styles/DashboardPage.styles';
import YandexMap from '../components/MapPage/YandexMap';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const selectedArea = useSelector(selectSelectedArea);
  const navigate = useNavigate();

  return (
    <Box sx={dashboardContainerStyles}>
      <Box sx={dashboardGridStyles}>
        {/* Левая панель с картой */}
        <Paper sx={commonBoxStyles}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            
          }}>
            {/* Верхняя часть с картой и кнопкой */}
            <Box sx={{
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start'
            }}>
              {/* Карта */}
              <Box sx={{
                width: '400px',
                height: '300px',
                border: '1px solid #ccc'
              }}>
                <YandexMap />
              </Box>

              {/* Кнопка перехода */}
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate('/map')}
                sx={{ minWidth: '150px' }}
              >
                Перейти к карте
              </Button>
            </Box>

            {/* Информация в четыре колонки */}
            {selectedArea ? (
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '10px'
            }}>
              {/* Первая колонка - Основная информация */}
              <Box>
                <Typography variant="h6" color="#ffffff">
                  Основная информация
                </Typography>
                <Typography variant="h4" color="#ffffff">
                  {selectedArea.name}
                </Typography>
                <Typography variant="body1" color="#ffffff">
                  {selectedArea.description}
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Площадь: {selectedArea.areaSize} га
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Координаты: {selectedArea.coordinates.join(', ')}
                </Typography>
              </Box>

              {/* Вторая колонка - Характеристики местности */}
              <Box>
                <Typography variant="h6" color="#ffffff">
                  Характеристики местности
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Тип местности: {selectedArea.terrainType}
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Ландшафт: {selectedArea.landscape}
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Высота над уровнем моря: {selectedArea.elevation} м
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Водные источники:
                  {selectedArea.waterSources.rivers ? 'Реки, ' : ''}
                  {selectedArea.waterSources.lakes ? 'Озера, ' : ''}
                  {selectedArea.waterSources.springs ? 'Родники' : ''}
                </Typography>
              </Box>

              {/* Третья колонка - Охота и правила */}
              <Box>
                <Typography variant="h6" color="#ffffff">
                  Охота и правила
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Разрешенные типы охоты: {selectedArea.allowedHuntingTypes.join(', ')}
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Сезон охоты: {selectedArea.huntingSeasons.start} - {selectedArea.huntingSeasons.end}
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Разрешенное оружие: {selectedArea.allowedWeapons.join(', ')}
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Ограничения: {selectedArea.restrictions}
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Правила: {selectedArea.rules}
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Необходимые разрешения: {selectedArea.requiredPermits}
                </Typography>
              </Box>

              {/* Четвертая колонка - Инфраструктура и контакты */}
              <Box>
                <Typography variant="h6" color="#ffffff">
                  Инфраструктура и контакты
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Инфраструктура: 
                  {selectedArea.infrastructure.roads ? 'Дороги, ' : ''}
                  {selectedArea.infrastructure.camps ? 'Лагеря, ' : ''}
                  {selectedArea.infrastructure.parking ? 'Парковка' : ''}
                </Typography>
                <Typography variant="body2" color="#ffffff">
                  Контакты администрации: 
                  Офис: {selectedArea.adminContacts.office}, 
                  Телефон: {selectedArea.adminContacts.email}
                </Typography>
                <Typography variant="body2" color="gray">
                  ID зоны: {selectedArea.id}
                </Typography>
                <Typography variant="body2" color="gray">
                  Создано: {new Date(selectedArea.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="gray">
                  Обновлено: {new Date(selectedArea.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            ) : (
              <Typography variant="h6" color="#ffffff">
                Выберите зону на карте для просмотра информации
              </Typography>
            )}
          </Box>
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