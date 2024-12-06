import React from 'react';
import { Paper, Typography, IconButton, Box, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomPopupInfoProps {
  position: [number, number];
  area: {
    name: string;
    description: string;
    licenses: Array<{name: string, valid: string}>;
    animals: Array<string>;
    routes: Array<{name: string, length: string}>;
    restrictions: Array<string>;
    migrations: Array<{animal: string, period: string, direction: string}>;
    terrain: {
      elevation: string;
      vegetation: string;
      water: string;
    };
    facilities: Array<string>;
  };
  onClose: () => void;
}

export const CustomPopupInfo: React.FC<CustomPopupInfoProps> = ({ position, area, onClose }) => {
  return (
    <Paper
      sx={{
        position: 'absolute',
        left: position[0],
        top: position[1],
        padding: 2,
        maxWidth: 400,
        maxHeight: 400,
        overflow: 'auto',
        boxShadow: 3,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">{area.name}</Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" paragraph>{area.description}</Typography>
      
      <Typography variant="subtitle1" fontWeight="bold">Лицензии</Typography>
      <List dense>
        {area.licenses.map((license, index) => (
          <ListItem key={index}>
            <ListItemText 
              primary={license.name}
              secondary={`Действительна до: ${license.valid}`}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />
      
      <Typography variant="subtitle1" fontWeight="bold">Животные</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {area.animals.map((animal, index) => (
          <Chip key={index} label={animal} size="small" />
        ))}
      </Box>

      <Typography variant="subtitle1" fontWeight="bold">Маршруты</Typography>
      <List dense>
        {area.routes.map((route, index) => (
          <ListItem key={index}>
            <ListItemText 
              primary={route.name}
              secondary={`Протяженность: ${route.length}`}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <Typography variant="subtitle1" fontWeight="bold">Ограничения</Typography>
      <List dense>
        {area.restrictions.map((restriction, index) => (
          <ListItem key={index}>
            <ListItemText primary={restriction} />
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" fontWeight="bold">Миграции</Typography>
      <List dense>
        {area.migrations.map((migration, index) => (
          <ListItem key={index}>
            <ListItemText 
              primary={migration.animal}
              secondary={`${migration.period}, направление: ${migration.direction}`}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <Typography variant="subtitle1" fontWeight="bold">Местность</Typography>
      <List dense>
        <ListItem>
          <ListItemText primary="Высота" secondary={area.terrain.elevation} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Растительность" secondary={area.terrain.vegetation} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Водоемы" secondary={area.terrain.water} />
        </ListItem>
      </List>

      <Typography variant="subtitle1" fontWeight="bold">Инфраструктура</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
        {area.facilities.map((facility, index) => (
          <Chip key={index} label={facility} size="small" variant="outlined" />
        ))}
      </Box>
    </Paper>
  );
};