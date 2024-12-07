import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
import {
  fetchEvents,
  createEvent,
  updateEventInDB,
  deleteEventFromDB,
} from "../Thunks/calendarThunks";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface CalendarState {
  events: Event[];
  currentDate: Dayjs;
  selectedDate: string | null;
}

const initialState: CalendarState = {
  events: [],
  currentDate: dayjs(),
  selectedDate: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCurrentDate(state, action: PayloadAction<Dayjs>) {
      state.currentDate = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string | null>) {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.events = action.payload;
        }
      )
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.events.push(action.payload);
      })
      .addCase(
        updateEventInDB.fulfilled,
        (state, action: PayloadAction<Event>) => {
          const index = state.events.findIndex(
            (event) => event.id === action.payload.id
          );
          if (index !== -1) {
            state.events[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteEventFromDB.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.events = state.events.filter(
            (event) => event.id !== action.payload
          );
        }
      );
  },
});

export const { setCurrentDate, setSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
