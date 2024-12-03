import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid2,
  Typography,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventModal from '../components/CalendarModal/EventModal';
import useStyles from '../Styles/CalendarStyles';

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
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [editEvent, setEditEvent] = useState<Event | null>(null);

  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleOpenModal = (date: string, eventToEdit: Event | null = null) => {
    setSelectedDate(date);
    setEditEvent(eventToEdit);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setEditEvent(null);
    setOpenModal(false);
  };

  const handleAddOrUpdateEvent = (newEvent: Event) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event.id !== newEvent.id);
      return [...updatedEvents, newEvent];
    });
    handleCloseModal();
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    handleCloseModal();
  };

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setCurrentMonth(Number(event.target.value));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setCurrentYear(Number(event.target.value));
  };

  return (
    <Box className={classes.calendarContainer}>
      <Typography variant="h4" className={classes.title}>
        Календарь
      </Typography>
      <Box className={classes.controls}>
        <Select value={currentYear} onChange={handleYearChange}>
          {Array.from({ length: 10 }).map((_, index) => {
            const year = 2020 + index;
            return (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            );
          })}
        </Select>
        <Select value={currentMonth} onChange={handleMonthChange}>
          {Array.from({ length: 12 }).map((_, index) => (
            <MenuItem key={index} value={index}>
              {new Date(2024, index).toLocaleString('default', { month: 'long' })}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid2 container spacing={2}>
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const date = `${currentYear}-${currentMonth + 1}-${day < 10 ? `0${day}` : day}`;
          const dayEvents = events.filter((e) => e.date === date);

          return (
            <Grid2
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={day}
              component="div"
            >
              <Box
                className={classes.dayCell}
                onClick={() => handleOpenModal(date)}
              >
                <Typography variant="body1" className={classes.dayNumber}>
                  {day}
                </Typography>
                {dayEvents.map((event) => (
                  <IconButton
                    key={event.id}
                    className={classes.eventIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(date, event);
                    }}
                  >
                    <EventAvailableIcon />
                  </IconButton>
                ))}
              </Box>
            </Grid2>
          );
        })}
      </Grid2>

      <EventModal
        open={openModal}
        date={selectedDate}
        onClose={handleCloseModal}
        onSave={handleAddOrUpdateEvent}
        onDelete={handleDeleteEvent}
        existingEvents={events.filter((event) => event.date === selectedDate) || []}
        editEvent={editEvent}
      />
    </Box>
  );
};

export default Calendar;
