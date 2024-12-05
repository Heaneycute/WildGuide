import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHuntingAreas = createAsyncThunk(
  'huntingAreas/fetch',
  async () => {
    // Загрузка охотничьих угодий
  }
);