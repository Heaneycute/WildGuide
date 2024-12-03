import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useStyles from '../../Styles/CalendarStyles';

interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
}

interface EventModalProps {
  open: boolean;
  date: string | null;
  onClose: () => void;
  onSave: (event: Event) => void;
  onDelete: (id: string) => void;
  existingEvents: Event[];
}

const EventModal: React.FC<EventModalProps> = ({
    open,
    date,
    onClose,
    onSave,
    onDelete,
    existingEvents,
    editEvent,
  }) => {
    const classes = useStyles();
    const [title, setTitle] = useState(editEvent?.title || '');
    const [description, setDescription] = useState(editEvent?.description || '');
  
    useEffect(() => {
      if (editEvent) {
        setTitle(editEvent.title);
        setDescription(editEvent.description);
      }
    }, [editEvent]);
  
    const handleSave = () => {
      if (date && title.trim()) {
        const newEvent = {
          id: editEvent?.id || `${date}-${Math.random()}`,
          date,
          title,
          description,
        };
        onSave(newEvent);
        setTitle('');
        setDescription('');
      }
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box className={classes.modal}>
          <Typography variant="h6" className={classes.modalTitle}>
            {editEvent ? 'Редактировать событие' : 'Добавить событие'}
          </Typography>
  
          <List>
            {existingEvents.map((event) => (
              <ListItem key={event.id}>
                <ListItemText
                  primary={event.title}
                  secondary={event.description}
                />
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => {
                    setTitle(event.title);
                    setDescription(event.description);
                  }}
                >
                  Редактировать
                </IconButton>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => onDelete(event.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
  
          <TextField
            label="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
  
          <Box className={classes.modalActions}>
            <Button onClick={handleSave} variant="contained" color="primary">
              {editEvent ? 'Сохранить' : 'Добавить'}
            </Button>
            <Button onClick={onClose} variant="outlined">
              Закрыть
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

export default EventModal;

