import { createAsyncThunk } from '@reduxjs/toolkit';

export const initializeMap = createAsyncThunk(
  'mapPage/initialize',
  async () => {
    // Инициализация карты
  }
);