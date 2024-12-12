import React, { useState, useContext } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import TerrainIcon from '@mui/icons-material/Terrain';
import PetsIcon from '@mui/icons-material/Pets';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { commonBoxStyles } from '../../Styles/MapPageComponents.styles';
import { ThemeContext } from '../../Styles/ThemeContext';

const mockAnimals = {
  animals: [
    {
      id: 1,
      name: "Лось",
      type: "Копытные",
      migration: "Сезонная, весна-осень",
      breedingSeason: "Сентябрь-Октябрь",
      diet: "Травоядное: побеги деревьев, кустарники, травы",
      behavior: [
        "Активны в сумерках",
        "Предпочитают влажные места",
        "Территориальны в период гона"
      ],
      huntingSeasons: ["Сентябрь", "Октябрь", "Ноябрь"],
      requirements: [
        {
          name: "Лицензия на копытных",
          description: "Лицензия выдается в региональном охотничьем департаменте. Адрес: ул. Лесная, 123. Тел: +7 (123) 456-7890. Необходимые документы: паспорт, охотничий билет, заявление.",
        },
        {
          name: "Охотничий билет",
          description: "Единый федеральный охотничий билет можно получить в МФЦ или через портал Госуслуг. Необходимо пройти охотминимум и предоставить паспорт.",
        }
      ]
    },
    {
      id: 2,
      name: "Кабан",
      type: "Копытные",
      migration: "Локальная",
      breedingSeason: "Ноябрь-Январь",
      diet: "Всеядное: корни, плоды, мелкие животные",
      behavior: [
        "Ночная активность",
        "Любят грязевые ванны",
        "Живут группами"
      ],
      huntingSeasons: ["Июнь", "Июль", "Август"],
      requirements: [
        {
          name: "Лицензия на копытных",
          description: "Лицензия выдается в региональном охотничьем департаменте. Адрес: ул. Лесная, 123. Тел: +7 (123) 456-7890. Необходимые документы: паспорт, охотничий билет, заявление.",
        },
        {
          name: "Охотничий билет",
          description: "Единый федеральный охотничий билет можно получить в МФЦ или через портал Госуслуг. Необходимо пройти охотминимум и предоставить паспорт.",
        }
      ]
    }
  ]
};

export default function AnimalsList() {
  const { currentTheme } = useContext(ThemeContext);
  const [selectedDocument, setSelectedDocument] = useState(null);

  return (
    <Paper sx={{
      ...commonBoxStyles,
      display: 'flex',
      flexDirection: 'column',
      height: '340px',
      width: '100%',
      backgroundColor: currentTheme.palette.background.paper
    }}>
      <Box sx={{
        flex: '0 0 auto',
        width: '100%',
        marginBottom: 2
      }}>
        <Typography variant="h5" color={currentTheme.palette.text.primary} gutterBottom>
          Список обитаемых животных
        </Typography>
      </Box>

      <Box sx={{
        flex: '1 1 auto',
        overflowY: 'auto',
        width: '100%',
        '&::-webkit-scrollbar': {
          width: '8px'
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.1)'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px'
        }
      }}>
        {mockAnimals.animals.map((animal) => (
          <Accordion 
            key={animal.id}
            sx={{ 
              backgroundColor: currentTheme.palette.background.default,
              color: currentTheme.palette.text.primary,
              mb: 1,
              minWidth: 0
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: currentTheme.palette.text.primary }} />}>
              <Typography noWrap><b>{animal.name}</b></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PetsIcon sx={{ mr: 1, color: currentTheme.palette.text.primary }} />
                <Typography>Тип: {animal.type}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TerrainIcon sx={{ mr: 1, color: currentTheme.palette.text.primary }} />
                <Typography>Миграция: {animal.migration}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CalendarMonthIcon sx={{ mr: 1, color: currentTheme.palette.text.primary }} />
                <Typography>Период размножения: {animal.breedingSeason}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalDiningIcon sx={{ mr: 1, color: currentTheme.palette.text.primary }} />
                <Typography>Питание: {animal.diet}</Typography>
              </Box>

              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Повадки:</Typography>
              {animal.behavior.map((item, index) => (
                <Typography key={index}>• {item}</Typography>
              ))}

              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Сезоны охоты:</Typography>
              {animal.huntingSeasons.map((season, index) => (
                <Typography key={index}>• {season}</Typography>
              ))}

              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Необходимые документы:</Typography>
              {animal.requirements.map((req, index) => (
                <Box 
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: currentTheme.palette.action?.hover
                    },
                    p: 1,
                    borderRadius: 1,
                    mt: 1
                  }}
                  onClick={() => setSelectedDocument(req)}
                >
                  <InfoOutlinedIcon sx={{ mr: 1, color: currentTheme.palette.text.primary }} />
                  <Typography>• {req.name}</Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Dialog
        open={Boolean(selectedDocument)}
        onClose={() => setSelectedDocument(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: currentTheme.palette.background.paper,
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            color: currentTheme.palette.text.primary
          }
        }}
      >
        {selectedDocument && (
          <>
            <DialogTitle sx={{ borderBottom: `1px solid ${currentTheme.palette.divider}` }}>
              {selectedDocument.name}
            </DialogTitle>
            <DialogContent>
              <Typography sx={{ mt: 2 }}>
                {selectedDocument.description}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ borderTop: `1px solid ${currentTheme.palette.divider}` }}>
              <Button
                onClick={() => setSelectedDocument(null)}
                sx={{
                  color: currentTheme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: currentTheme.palette.action?.hover
                  }
                }}
              >
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Paper>
  );
}