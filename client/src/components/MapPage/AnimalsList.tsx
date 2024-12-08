import React, { useState } from 'react';
import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { commonBoxStyles } from '../../Styles/MapPageComponents.styles';

// Mock data for animals
const mockAnimals = {
  categories: [
    {
      name: "Копытные",
      animals: [
        {
          id: 1,
          name: "Лось",
          latinName: "Alces alces",
          description: "Крупное парнокопытное животное семейства оленевых",
          habitat: "Лесные массивы, болота",
          diet: "Травоядное: побеги деревьев, кустарники, травы",
          huntingSeasons: ["Сентябрь", "Октябрь", "Ноябрь"],
          huntingMethods: ["Загонная охота", "С подхода", "На реву"],
          requirements: ["Лицензия на копытных", "Охотничий билет"]
        },
        {
          id: 2,
          name: "Кабан",
          latinName: "Sus scrofa",
          description: "Парнокопытное млекопитающее из семейства свиных",
          habitat: "Смешанные леса, заросли кустарника",
          diet: "Всеядное: корни, плоды, мелкие животные",
          huntingSeasons: ["Июнь", "Июль", "Август"],
          huntingMethods: ["Загонная охота", "На приваде", "С вышки"],
          requirements: ["Лицензия на копытных", "Охотничий билет"]
        }
      ]
    },
    {
      name: "Пернатая дичь",
      animals: [
        {
          id: 3,
          name: "Утка кряква",
          latinName: "Anas platyrhynchos",
          description: "Водоплавающая птица из семейства утиных",
          habitat: "Водоемы, болота",
          diet: "Растительная пища, мелкие водные организмы",
          huntingSeasons: ["Август", "Сентябрь", "Октябрь"],
          huntingMethods: ["С подхода", "На перелете", "С чучелами"],
          requirements: ["Охотничий билет", "Разрешение на добычу"]
        }
      ]
    },
    {
      name: "Пушные звери",
      animals: [
        {
          id: 4,
          name: "Лиса",
          latinName: "Vulpes vulpes",
          description: "Хищное млекопитающее семейства псовых",
          habitat: "Леса, поля, окраины населенных пунктов",
          diet: "Хищник: грызуны, птицы, насекомые",
          huntingSeasons: ["Октябрь", "Ноябрь", "Декабрь", "Январь"],
          huntingMethods: ["С гончими", "На приваде", "Троплением"],
          requirements: ["Охотничий билет"]
        }
      ]
    }
  ]
};

export default function AnimalsList() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
  };

  return (
    <Box sx={commonBoxStyles}>
      <Typography variant="h5" color="#ffffff" gutterBottom>
        ЖИВОТНЫЙ МИР
      </Typography>

      <Stack spacing={2}>
        {mockAnimals.categories.map((category) => (
          <Accordion 
            key={category.name}
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              color: '#ffffff',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}>
              <Typography>{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                {category.animals.map((animal) => (
                  <Box
                    key={animal.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1,
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Typography>{animal.name}</Typography>
                    <IconButton
                      size="small"
                      sx={{ color: '#ffffff' }}
                      onClick={() => handleAnimalClick(animal)}
                    >
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

      <Dialog
        open={Boolean(selectedAnimal)}
        onClose={() => setSelectedAnimal(null)}
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
        {selectedAnimal && (
          <>
            <DialogTitle>
              {selectedAnimal.name}
              <Typography variant="subtitle2" color="gray">
                {selectedAnimal.latinName}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedAnimal.description}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Среда обитания
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedAnimal.habitat}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Питание
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedAnimal.diet}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Сезоны охоты
              </Typography>
              <Stack spacing={1}>
                {selectedAnimal.huntingSeasons.map((season, index) => (
                  <Typography key={index} variant="body1">
                    • {season}
                  </Typography>
                ))}
              </Stack>

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Способы охоты
              </Typography>
              <Stack spacing={1}>
                {selectedAnimal.huntingMethods.map((method, index) => (
                  <Typography key={index} variant="body1">
                    • {method}
                  </Typography>
                ))}
              </Stack>

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Необходимые документы
              </Typography>
              <Stack spacing={1}>
                {selectedAnimal.requirements.map((req, index) => (
                  <Typography key={index} variant="body1">
                    • {req}
                  </Typography>
                ))}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setSelectedAnimal(null)}
                sx={{ color: '#ffffff' }}
              >
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}