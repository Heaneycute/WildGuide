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
import axiosInstance from "../../axiosInstance";

interface Event {
  id: number;
  date: string;
  title: string;
  description: string;
}

interface EventModalProps {
  open: boolean;
  date: string | null;
  onClose: () => void;
  onSave: (event: Event) => void;
  onDelete: (id: number) => void;
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
  const apiUrl = import.meta.env.VITE_API;

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setEditEvent(null);
    }
  }, [open]);

  const handleSave = async () => {
    try {
      const method = editEvent ? "put" : "post";
      const url = editEvent ? `/events/${editEvent.id}` : `/events`;
      const response = await axiosInstance[method](`${apiUrl}${url}`, {
        date: date!,
        title,
        description,
      });
      toast.success(
        editEvent ? "Событие успешно изменено!" : "Событие успешно добавлено!"
      );
      onSave(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Ошибка сохранения события");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`${apiUrl}/events/${id}`);
      toast.success("Событие успешно удалено!");
      onDelete(id);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Ошибка удаления события");
    }
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
