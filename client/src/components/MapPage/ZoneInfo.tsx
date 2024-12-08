import React, { useState } from 'react';
import { Box, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { selectSelectedArea } from '../../Redux/Slices/MapPage/huntingAreasSlice';
import { commonBoxStyles } from '../../Styles/MapPageComponents.styles';

export default function ZoneInfo() {
  const [selectedCabin, setSelectedCabin] = useState(null);
  const selectedArea = useSelector(selectSelectedArea);

  if (!selectedArea) {
    return (
      <Box sx={commonBoxStyles}>
        <Typography variant="h6" color="#ffffff">
          Выберите зону на карте для просмотра информации
        </Typography>
      </Box>
    );
  }

  const mockData = {
    terrainInfo: "Смешанный лес • 1250.75 га • 156 м",
    cabins: {
      total: 3,
      permanent: 2,
      temporary: 1,
      capacity: 12,
      list: [
        {
          id: 1,
          name: "Домик у озера",
          type: "permanent",
          capacity: 4,
          hasElectricity: true,
          heatingType: "Печное",
          kitchenFacilities: true,
          bathroomType: "Внутренний",
          price: 2500,
          transportAccess: "Подъезд на автомобиле",
          description: "Уютный домик с видом на озеро, оборудованный всем необходимым для комфортного проживания."
        },
        {
          id: 2,
          name: "Лесной приют",
          type: "permanent",
          capacity: 6,
          hasElectricity: true,
          heatingType: "Электрическое",
          kitchenFacilities: true,
          bathroomType: "Внутренний",
          price: 3000,
          transportAccess: "Грунтовая дорога",
          description: "Просторный домик в глубине леса, идеален для больших компаний."
        },
        {
          id: 3,
          name: "Временный лагерь",
          type: "temporary",
          capacity: 2,
          hasElectricity: false,
          heatingType: "Нет",
          kitchenFacilities: false,
          bathroomType: "Внешний",
          price: 1000,
          transportAccess: "Пешая доступность",
          description: "Базовое укрытие для настоящих ценителей природы."
        }
      ]
    },
    hunting: ["Копытные (кабан, лось)", "Пушные звери", "Водоплавающая дичь"],
    seasons: ["Весна: 15.03 - 30.04", "Осень: 15.09 - 15.12", "Зима: 01.01 - 28.02"],
    restrictions: [
      "Запрет ночной охоты",
      "Запрет моторных лодок",
      "Лимит добычи",
      "Запрет в период размножения"
    ],
    infrastructure: [
      "Вышки: 3",
      "Дороги: 2",
      "Парковка: 10 мест",
      "Площадка разделки"
    ],
    waterSources: [
      "Озеро \"Круглое\"",
      "Ручей \"Светлый\"",
      "Родники: 2"
    ],
    documents: [
      "Охотничий билет",
      "Разрешение на оружие",
      "Путевка на охоту",
      "Лицензия"
    ],
    contacts: [
      "Егерь: +7 XXX XXX XX XX",
      "Офис: +7 XXX XXX XX XX",
      "Email: hunt@example.com",
      "Время: 9:00-18:00"
    ],
    rules: [
      "Техника безопасности",
      "Костры только в спец. местах",
      "Уборка мусора",
      "Парковка в отведенных местах"
    ]
  };

  const handleCabinClick = (cabin) => {
    setSelectedCabin(cabin);
  };

  const handleCloseDialog = () => {
    setSelectedCabin(null);
  };

  return (
    <Box sx={{
      ...commonBoxStyles,
      display: 'flex',
      flexDirection: 'column',
      height: '500px',
      width: '100%'
    }}>
      <Box sx={{ 
        flex: '0 0 auto', 
        width: '100%',
        marginBottom: 2
      }}>
        <Typography variant="h5" color="#ffffff" gutterBottom>
          {selectedArea.name}
        </Typography>
        <Typography variant="subtitle1" color="#ffffff" gutterBottom>
          {mockData.terrainInfo}
        </Typography>
        <Typography variant="body1" color="#ffffff" gutterBottom>
          {selectedArea.description}
        </Typography>
        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
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
        {/* Домики */}
        <Accordion sx={{ 
          bgcolor: 'rgba(0, 0, 0, 0.3)', 
          color: '#ffffff', 
          mb: 1,
          minWidth: 0
        }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}>
            <Typography noWrap>🏠 Домики ({mockData.cabins.total})</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>• {mockData.cabins.permanent} постоянных</Typography>
            <Typography>• {mockData.cabins.temporary} временный</Typography>
            <Typography>• Общая вместимость: {mockData.cabins.capacity} человек</Typography>
            <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />
            {mockData.cabins.list.map((cabin) => (
              <Box 
                key={cabin.id} 
                sx={{ 
                  cursor: 'pointer', 
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  },
                  p: 1,
                  borderRadius: 1,
                  mt: 1
                }}
                onClick={() => handleCabinClick(cabin)}
              >
                <Typography>
                  • {cabin.name} ({cabin.type === 'permanent' ? 'Постоянный' : 'Временный'})
                </Typography>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Диалоговое окно с информацией о домике */}
        <Dialog 
          open={Boolean(selectedCabin)} 
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              color: '#ffffff'
            }
          }}
        >
          {selectedCabin && (
            <>
              <DialogTitle sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                {selectedCabin.name}
              </DialogTitle>
              <DialogContent>
                <Typography paragraph><b>Тип:</b> {selectedCabin.type === 'permanent' ? 'Постоянный' : 'Временный'}</Typography>
                <Typography paragraph><b>Вместимость:</b> {selectedCabin.capacity} человек</Typography>
                <Typography paragraph><b>Электричество:</b> {selectedCabin.hasElectricity ? 'Есть' : 'Нет'}</Typography>
                <Typography paragraph><b>Отопление:</b> {selectedCabin.heatingType}</Typography>
                <Typography paragraph><b>Кухня:</b> {selectedCabin.kitchenFacilities ? 'Есть' : 'Нет'}</Typography>
                <Typography paragraph><b>Санузел:</b> {selectedCabin.bathroomType}</Typography>
                <Typography paragraph><b>Стоимость:</b> {selectedCabin.price} руб/сутки</Typography>
                <Typography paragraph><b>Транспортная доступность:</b> {selectedCabin.transportAccess}</Typography>
                <Typography paragraph><b>Описание:</b> {selectedCabin.description}</Typography>
              </DialogContent>
              <DialogActions sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Button 
                  onClick={handleCloseDialog}
                  sx={{ 
                    color: '#ffffff',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Закрыть
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Охота */}
        <Accordion sx={{ 
          bgcolor: 'rgba(0, 0, 0, 0.3)', 
          color: '#ffffff', 
          mb: 1,
          minWidth: 0
        }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}>
            <Typography noWrap>🎯 Охота</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {mockData.hunting.map((item, index) => (
              <Typography key={index} noWrap>• {item}</Typography>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Остальные секции */}
        {[
          { icon: '📅', title: 'Сезоны', data: mockData.seasons },
          { icon: '⚠️', title: 'Ограничения', data: mockData.restrictions },
          { icon: '🏗️', title: 'Инфраструктура', data: mockData.infrastructure },
          { icon: '💧', title: 'Вода', data: mockData.waterSources },
          { icon: '📋', title: 'Документы', data: mockData.documents },
          { icon: '📞', title: 'Контакты', data: mockData.contacts },
          { icon: '📜', title: 'Правила', data: mockData.rules }
        ].map(({ icon, title, data }) => (
          <Accordion key={title} sx={{ 
            bgcolor: 'rgba(0, 0, 0, 0.3)', 
            color: '#ffffff', 
            mb: 1,
            minWidth: 0
          }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}>
              <Typography noWrap>{icon} {title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data.map((item, index) => (
                <Typography key={index} noWrap>• {item}</Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}