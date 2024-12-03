import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
}

interface EventListProps {
  events: Event[];
  onDelete: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDelete }) => {
  return (
    <Box sx={{ width: "100%", padding: "1rem", borderLeft: "1px solid #ddd" }}>
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        Список событий
      </Typography>
      <List>
        {events.length > 0 ? (
          events.map((event) => (
            <ListItem
              key={event.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <EventAvailableIcon
                sx={{ marginRight: "1rem", color: "#4caf50" }}
              />
              <ListItemText
                primary={event.title}
                secondary={`${event.date} — ${event.description}`}
              />
              <IconButton
                aria-label="delete event"
                onClick={() => onDelete(event.id)}
                size="small"
                sx={{ marginLeft: "1rem" }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Список событий пока пуст.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default EventList;
