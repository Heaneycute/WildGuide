import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAnimals, setLoading, setError } from '../Slices/animalExampleSlice';
import axiosInstance from '../../axiosInstance';

export const fetchAnimalExampleThunk = createAsyncThunk(
  'animalExample/fetchData',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await axiosInstance.get(`${import.meta.env.VITE_API}/animals-example`);
      dispatch(setAnimals(response.data));
      
      return response.data;
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);