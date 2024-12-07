import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRoutes = createAsyncThunk(
  'routesmap/fetch',
  async () => {
    // Загрузка маршрутов
  }
);