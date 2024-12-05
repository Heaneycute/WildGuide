import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAnimals = createAsyncThunk(
  'animals/fetch',
  async () => {
    // Загрузка данных о животных
  }
);