import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Grid2, Tooltip } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import dayjs, { Dayjs } from "dayjs";
import EventModal from "../components/CalendarModal/EventModal";
import EventList from "../components/CalendarModal/EventList";
import useStyles from "../Styles/CalendarStyles";

interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
}

const Calendar: React.FC = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const daysInMonth = currentDate.daysInMonth();

  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handleOpenModal = (date: string) => {
    setSelectedDate(date);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setOpenModal(false);
  };

  const handleAddOrUpdateEvent = (newEvent: Event) => {
    setEvents((prevEvents) => [
      ...prevEvents.filter((event) => event.id !== newEvent.id),
      newEvent,
    ]);
    handleCloseModal();
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    handleCloseModal();
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setCurrentDate(newDate);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  return (
    <Box className={classes.calendarContainer} display="flex">
      <Box flex="3" marginRight="2rem">
        <Box
          className={classes.controls}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year"]}
              label="Выберите год"
              value={currentDate}
              onChange={handleDateChange}
              sx={{ marginRight: "2rem" }}
            />
          </LocalizationProvider>
          <Typography variant="h5" sx={{ marginRight: "2rem" }}>
            {currentDate.format("MMMM YYYY")}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              aria-label="previous month"
              onClick={handlePrevMonth}
              size="large"
            >
              <ChevronLeftIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton
              aria-label="next month"
              onClick={handleNextMonth}
              size="large"
            >
              <ChevronRightIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Box>
        <Grid2 container spacing={2}>
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const date = currentDate.format(
              `YYYY-MM-${day < 10 ? `0${day}` : day}`
            );
            const dayEvents = events.filter((e) => e.date === date);

            return (
              <Grid2 item xs={12} sm={6} md={4} lg={3} key={day}>
                <Box
                  className={classes.dayCell}
                  onClick={() => handleOpenModal(date)}
                >
                  <Typography variant="body1" className={classes.dayNumber}>
                    {day}
                  </Typography>
                  {dayEvents.map((event) => (
                    <Tooltip key={event.id} title={`${event.title}: ${event.description}`} placement="top">
                    <IconButton key={event.id} className={classes.eventIcon}>
                      <EventAvailableIcon />
                    </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>

      <Box flex="1">
        <EventList events={events} onDelete={handleDeleteEvent} />
      </Box>

      <EventModal
        open={openModal}
        date={selectedDate}
        onClose={handleCloseModal}
        onSave={handleAddOrUpdateEvent}
        onDelete={handleDeleteEvent}
        existingEvents={
          events.filter((event) => event.date === selectedDate) || []
        }
      />
    </Box>
  );
};

export default Calendar;
