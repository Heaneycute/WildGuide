import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { deleteEventFromDB } from "../../Redux/Thunks/calendarThunks";
import dayjs from "dayjs";

const EventList: React.FC = () => {
  const events = useAppSelector((state) => state.calendar.events);
  const dispatch = useAppDispatch();

  const sortedEvents = [...events].sort((a, b) =>
    dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
  );

  return (
    <Box sx={{ width: "100%", padding: "1rem", borderLeft: "1px solid #ddd" }}>
      <Typography
        variant="h6"
        color="textSecondary"
        sx={{ marginBottom: "1rem" }}
      >
        Список событий
      </Typography>
      <List>
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
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
                primaryTypographyProps={{ sx: { color: "white" } }}
                secondaryTypographyProps={{ sx: { color: "gray" } }}
              />
              <IconButton
                aria-label="delete event"
                size="small"
                sx={{ marginLeft: "1rem" }}
                onClick={() => dispatch(deleteEventFromDB(event.id))}
              >
                Удалить
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
