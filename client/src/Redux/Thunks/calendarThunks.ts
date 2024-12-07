import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { Event } from "../Slices/calendarSlice";

export const fetchEvents = createAsyncThunk<Event[]>(
  "calendar/fetchEvents",
  async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/events`
    );
    return response.data;
  }
);

export const createEvent = createAsyncThunk<Event, Event>(
  "calendar/createEvent",
  async (newEvent) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API}/events`,
      newEvent
    );
    return response.data;
  }
);

export const updateEventInDB = createAsyncThunk<Event, Event>(
  "calendar/updateEvent",
  async (updatedEvent) => {
    const response = await axiosInstance.put(
      `${import.meta.env.VITE_API}/events/${updatedEvent.id}`,
      updatedEvent
    );
    return response.data;
  }
);

export const deleteEventFromDB = createAsyncThunk<number, number>(
  "calendar/deleteEvent",
  async (eventId) => {
    await axiosInstance.delete(`${import.meta.env.VITE_API}/events/${eventId}`);
    return eventId;
  }
);
