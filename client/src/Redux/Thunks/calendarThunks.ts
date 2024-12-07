import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';
import { setEvents, setIsLoading, setError } from '../Slices/calendarSlice';

export const fetchEvents = createAsyncThunk(
  'calendar/fetchEvents',
  async (_, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setError(null));
      const response = await axiosInstance.get(`${import.meta.env.VITE_API}/events`);
      dispatch(setEvents(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);