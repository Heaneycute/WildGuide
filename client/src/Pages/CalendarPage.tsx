import React, { useEffect } from 'react';
import { Box, Typography, IconButton, Grid2, Tooltip } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import dayjs from 'dayjs';
import EventModal from '../components/CalendarModal/EventModal';
import EventList from '../components/CalendarModal/EventList';
import useStyles from '../Styles/CalendarStyles';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { fetchEvents, setCurrentDate, setSelectedDate, updateEvent, deleteEvent } from '../Redux/Slices/calendarSlice';

const Calendar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { events, currentDate, selectedDate } = useAppSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    if (newDate) {
      dispatch(setCurrentDate(newDate));
    }
  };

  const handlePrevMonth = () => {
    dispatch(setCurrentDate(currentDate.subtract(1, 'month')));
  };

  const handleNextMonth = () => {
    dispatch(setCurrentDate(currentDate.add(1, 'month')));
  };

  const handleOpenModal = (date: string) => {
    dispatch(setSelectedDate(date));
  };

  const handleCloseModal = () => {
    dispatch(setSelectedDate(null));
  };

  const handleAddOrUpdateEvent = (newEvent: Event) => {
    dispatch(updateEvent(newEvent));
  };

  const handleDeleteEvent = (id: number) => {
    dispatch(deleteEvent(id));
  };

  return (
    <Box className={classes.calendarContainer} display="flex">
      <Box flex="3" marginRight="2rem">
        <Box className={classes.controls} display="flex" justifyContent="space-around" alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker views={['year']} value={currentDate} onChange={handleDateChange} sx={{ marginRight: '2rem' }} />
          </LocalizationProvider>
          <Typography variant="h5" sx={{ marginRight: '2rem' }}>{currentDate.format('MMMM YYYY')}</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton aria-label="previous month" onClick={handlePrevMonth} size="large">
              <DoubleArrowIcon sx={{ fontSize: 30, transform: 'rotate(180deg)' }} />
            </IconButton>
            <IconButton aria-label="next month" onClick={handleNextMonth} size="large">
              <DoubleArrowIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Box>
        <Grid2 container spacing={2}>
          {Array.from({ length: currentDate.daysInMonth() }, (_, index) => {
            const day = index + 1;
            const date = currentDate.format(`YYYY-MM-${day < 10 ? `0${day}` : day}`);
            const dayEvents = events.filter((e) => e.date === date);
            return (
              <Grid2 xs={12} sm={6} md={4} lg={3} key={day}>
                <Box className={classes.dayCell} onClick={() => handleOpenModal(date)}>
                  <Typography variant="body1" className={classes.dayNumber}>{day}</Typography>
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
        <EventList onDelete={handleDeleteEvent} />
      </Box>
      <EventModal open={!!selectedDate} date={selectedDate} onClose={handleCloseModal} onSave={handleAddOrUpdateEvent} onDelete={handleDeleteEvent} existingEvents={events.filter((event) => event.date === selectedDate) || []} />
    </Box>
  );
};

export default Calendar;
