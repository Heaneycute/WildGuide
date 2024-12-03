import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useStyles from "../../Styles/CalendarStyles";
import { toast } from "react-toastify";

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
}) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editEvent, setEditEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setEditEvent(null);
    }
  }, [open]);

  const handleSave = () => {
    if (date && title.trim()) {
      const updatedEvent = {
        id: editEvent?.id || `${date}-${Math.random()}`,
        date,
        title,
        description,
      };

      if (editEvent) {
        toast.success("Событие успешно изменено!");
      } else {
        toast.success("Событие успешно добавлено!");
      }

      onSave(updatedEvent);
    }
  };

  const handleDelete = (id: string) => {
    toast.success("Событие успешно удалено!");
    onDelete(id);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={classes.modal}>
        <Typography variant="h6" className={classes.modalTitle}>
          {editEvent ? "Редактировать событие" : "Добавить событие"}
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
                  setEditEvent(event);
                }}
              >
                Редактировать
              </IconButton>
              <IconButton
                edge="end"
                color="error"
                onClick={() => handleDelete(event.id)}
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
            {editEvent ? "Сохранить" : "Добавить"}
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
