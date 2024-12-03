import { Typography, Box, Grid, Card, CardContent, IconButton, Chip } from '@mui/material';
import { Favorite, FavoriteBorder, LocationOn, Timer, Edit, Visibility } from '@mui/icons-material';
import { useState } from 'react';

export default function CollorExampleCard() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'card1': false,
    'card2': false,
    'card3': false
  });

  const handleFavoriteClick = (cardId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {/* Стиль 1 - Светлый */}
        <Grid item xs={12} md={4}>
          <Card 
            sx={{
              cursor: 'pointer',
              backgroundColor: '#B9C096',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(71, 73, 59, 0.2)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                color: '#19290C'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Кабан</Typography>
                <Box>
                  <IconButton 
                    sx={{ 
                      color: favorites['card1'] ? '#5F3D22' : '#19290C',
                      transition: 'color 0.3s ease'
                    }}
                    onClick={handleFavoriteClick('card1')}
                  >
                    {favorites['card1'] ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton 
                    sx={{ color: '#5F3D22' }}
                    onClick={(e) => handleEditClick(e, 'кабан')}
                  >
                    <Edit />
                  </IconButton>
                </Box>
              </Box>
              <Typography sx={{ color: '#47493B' }}>Копытные</Typography>
              <Typography variant="body2" sx={{ color: '#19290C' }}>
                Крупное всеядное животное, обитает в лесах. Период охоты: июнь-январь.
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Chip
                  icon={<LocationOn sx={{ color: '#7C984E' }} />}
                  label="Лесная зона"
                  size="small"
                  sx={{
                    backgroundColor: '#47493B',
                    color: '#B9C096',
                    '& .MuiChip-icon': { color: '#B9C096' }
                  }}
                />
                <Chip
                  icon={<Timer sx={{ color: '#7C984E' }} />}
                  label="01.06.2024 - 15.01.2025"
                  size="small"
                  sx={{
                    backgroundColor: '#47493B',
                    color: '#B9C096',
                    '& .MuiChip-icon': { color: '#B9C096' }
                  }}
                />
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  mt: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  color: '#5F3D22'
                }}
              >
                <Visibility sx={{ fontSize: 16, color: '#5F3D22' }} />
                247
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Стиль 2 - Зеленый */}
        <Grid item xs={12} md={4}>
          <Card sx={{
            backgroundColor: '#7C984E',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 16px rgba(124, 152, 78, 0.2)'
            }
          }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                color: '#19290C' 
              }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Лось</Typography>
                <Box>
                  <IconButton 
                    sx={{ 
                      color: favorites['card2'] ? '#B9C096' : '#19290C',
                      transition: 'color 0.3s ease'
                    }}
                    onClick={handleFavoriteClick('card2')}
                  >
                    {favorites['card2'] ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton 
                    sx={{ color: '#19290C' }}
                    onClick={(e) => handleEditClick(e, 'лось')}
                  >
                    <Edit />
                  </IconButton>
                </Box>
              </Box>
              <Typography sx={{ color: '#2D322C' }}>Копытные</Typography>
              <Typography variant="body2" sx={{ color: '#19290C' }}>
                Крупное парнокопытное животное, обитает в лесах. Период охоты: сентябрь-январь.
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Chip
                  icon={<LocationOn sx={{ color: '#19290C' }} />}
                  label="Тайга"
                  size="small"
                  sx={{
                    backgroundColor: '#19290C',
                    color: '#B9C096',
                    '& .MuiChip-icon': { color: '#B9C096' }
                  }}
                />
                <Chip
                  icon={<Timer sx={{ color: '#19290C' }} />}
                  label="01.09.2024 - 31.12.2024"
                  size="small"
                  sx={{
                    backgroundColor: '#19290C',
                    color: '#B9C096',
                    '& .MuiChip-icon': { color: '#B9C096' }
                  }}
                />
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  mt: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  color: '#19290C'
                }}
              >
                <Visibility sx={{ fontSize: 16, color: '#19290C' }} />
                189
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Стиль 3 - Коричневый */}
        <Grid item xs={12} md={4}>
          <Card sx={{
            backgroundColor: '#947D5E',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 16px rgba(148, 125, 94, 0.2)'
            }
          }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                color: '#19290C' 
              }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Медведь</Typography>
                <Box>
                  <IconButton 
                    sx={{ 
                      color: favorites['card3'] ? '#DFD6CD' : '#19290C',
                      transition: 'color 0.3s ease'
                    }}
                    onClick={handleFavoriteClick('card3')}
                  >
                    {favorites['card3'] ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton 
                    sx={{ color: '#19290C' }}
                    onClick={(e) => handleEditClick(e, 'медведь')}
                  >
                    <Edit />
                  </IconButton>
                </Box>
              </Box>
              <Typography sx={{ color: '#2D322C' }}>Хищники</Typography>
              <Typography variant="body2" sx={{ color: '#19290C' }}>
                Крупный хищник, обитает в лесах и горах. Период охоты: август-декабрь.
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Chip
                  icon={<LocationOn sx={{ color: '#DFD6CD' }} />}
                  label="Горы"
                  size="small"
                  sx={{
                    backgroundColor: '#5F3D22',
                    color: '#DFD6CD',
                    '& .MuiChip-icon': { color: '#DFD6CD' }
                  }}
                />
                <Chip
                  icon={<Timer sx={{ color: '#DFD6CD' }} />}
                  label="01.08.2024 - 31.12.2024"
                  size="small"
                  sx={{
                    backgroundColor: '#5F3D22',
                    color: '#DFD6CD',
                    '& .MuiChip-icon': { color: '#DFD6CD' }
                  }}
                />
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  mt: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  color: '#19290C'
                }}
              >
                <Visibility sx={{ fontSize: 16, color: '#19290C' }} />
                312
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}