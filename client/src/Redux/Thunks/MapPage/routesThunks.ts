// src/Redux/Thunks/MapPage/routesThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Получение всех маршрутов
export const fetchRoutes = createAsyncThunk(
  'routes/fetch',
  async (_, { rejectWithValue }) => {
    console.log('Отправка GET-запроса для получения маршрутов...');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/routes`);
      console.log('Получены данные о маршрутах:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении маршрутов:', error);
      return rejectWithValue('Не удалось загрузить маршруты');
    }
  }
);

// Создание нового маршрута
export const createRoute = createAsyncThunk(
  'routes/create',
  async (data: any, { rejectWithValue }) => {
    console.log('Отправка POST-запроса для создания маршрута...');
    console.log('Данные для создания:', data);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/routes`, data);
      console.log('Создан новый маршрут:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании маршрута:', error);
      return rejectWithValue('Не удалось создать маршрут');
    }
  }
);

// Обновление маршрута
export const updateRoute = createAsyncThunk(
  'routes/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    console.log(`Отправка PATCH-запроса для обновления маршрута ${id}...`);
    console.log('Данные для обновления:', data);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}/routes/${id}`, data);
      console.log('Маршрут обновлен:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении маршрута:', error);
      return rejectWithValue('Не удалось обновить маршрут');
    }
  }
);

// Удаление маршрута
export const deleteRoute = createAsyncThunk(
  'routes/delete',
  async (id: string, { rejectWithValue }) => {
    console.log(`Отправка DELETE-запроса для удаления маршрута ${id}...`);
    try {
      await axios.delete(`${import.meta.env.VITE_API}/routes/${id}`);
      console.log('Маршрут успешно удален');
      return id;
    } catch (error) {
      console.error('Ошибка при удалении маршрута:', error);
      return rejectWithValue('Не удалось удалить маршрут');
    }
  }
);

// Верификация маршрута
export const verifyRoute = createAsyncThunk(
  'routes/verify',
  async (id: string, { rejectWithValue }) => {
    console.log(`Отправка PATCH-запроса для верификации маршрута ${id}...`);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}/routes/${id}/verify`);
      console.log('Маршрут верифицирован:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при верификации маршрута:', error);
      return rejectWithValue('Не удалось верифицировать маршрут');
    }
  }
);