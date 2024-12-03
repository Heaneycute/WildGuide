import { createAsyncThunk } from '@reduxjs/toolkit';
import { setData, setLoading, setError } from '../Slices/exampleSlice';
import axiosInstance from '../../axiosInstance';

export const fetchDataThunk = createAsyncThunk(
  'example/fetchData',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await axiosInstance.get(`${import.meta.env.VITE_API}/data`);
      dispatch(setData(response.data));
      
      return response.data;
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);