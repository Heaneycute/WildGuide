import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';

interface Event {
  id: number;
  date: string;
  title: string;
  description: string;
}

interface CalendarState {
  events: Event[];
  currentDate: dayjs.Dayjs;
  selectedDate: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  events: [],
  currentDate: dayjs(),
  selectedDate: null,
  isLoading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  'calendar/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/events`);
      if (!Array.isArray(response.data)) {
        return rejectWithValue('Invalid API response format');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    addEvent: (state, action) => state.events.push(action.payload),
    updateEvent: (state, action) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = { ...state.events[index], ...action.payload };
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }).addCase(fetchEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.events = action.payload;
    }).addCase(fetchEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setCurrentDate, setSelectedDate, addEvent, updateEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
