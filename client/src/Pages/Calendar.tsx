import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid2,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EventModal from '../components/CalendarModal/EventModal';
import useStyles from '../Styles/CalendarStyles';
import dayjs, { Dayjs } from 'dayjs';

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
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
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
    setEvents((prevEvents) => [...prevEvents.filter((event) => event.id !== newEvent.id), newEvent]);
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

  return (
    <Box className={classes.calendarContainer}>
      <Box className={classes.controls}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year', 'month']}
            label="Выбор года и месяца"
            value={currentDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </Box>
      <Grid2 container spacing={2}>
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const date = currentDate.format(`YYYY-MM-${day < 10 ? `0${day}` : day}`);
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
                  <IconButton key={event.id} className={classes.eventIcon}>
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
      />
    </Box>
  );
};

export default Calendar;
