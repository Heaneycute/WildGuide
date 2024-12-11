import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { HuntingArea } from '../../../types/MapPage/HuntingAreaType';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Загрузка всех охотничьих зон
export const fetchHuntingAreas = createAsyncThunk(
  'huntingAreas/fetch',
  async (_, { rejectWithValue }) => {
    console.log('Отправка GET-запроса для получения охотничьих зон...');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/hunting-areas`);
      console.log('Получены данные о зонах:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении зон:', error);
      return rejectWithValue('Не удалось загрузить охотничьи зоны');
    }
  }
);

// Создание новой зоны
export const createHuntingArea = createAsyncThunk(
  'huntingAreas/create',
  async (data: HuntingArea, { rejectWithValue }) => {
    console.log('Отправка POST-запроса для создания зоны...');
    console.log('Данные для создания:', data);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/hunting-areas`, data);
      console.log('Создана новая зона:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании зоны:', error);
      return rejectWithValue('Не удалось создать охотничью зону');
    }
  }
);

// Обновление существующей зоны
export const updateHuntingArea = createAsyncThunk(
  'huntingAreas/update',
  async ({ id, data }: { id: string; data: Partial<HuntingArea> }, { rejectWithValue }) => {
    console.log(`Отправка PATCH-запроса для обновления зоны ${id}...`);
    console.log('Данные для обновления:', data);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}/hunting-areas/${id}`, data);
      console.log('Зона обновлена:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении зоны:', error);
      return rejectWithValue('Не удалось обновить охотничью зону');
    }
  }
);

// Удаление зоны
export const deleteHuntingArea = createAsyncThunk(
  'huntingAreas/delete',
  async (id: string, { rejectWithValue }) => {
    console.log(`Отправка DELETE-запроса для удаления зоны ${id}...`);
    try {
      await axios.delete(`${import.meta.env.VITE_API}/hunting-areas/${id}`);
      console.log('Зона успешно удалена');
      return id;
    } catch (error) {
      console.error('Ошибка при удалении зоны:', error);
      return rejectWithValue('Не удалось удалить охотничью зону');
    }
  }
);

// Получение публичных зон
export const fetchPublicAreas = createAsyncThunk(
  'huntingAreas/fetchPublic',
  async (_, { rejectWithValue }) => {
    console.log('Отправка GET-запроса для получения публичных зон...');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/hunting-areas/public`);
      console.log('Получены публичные зоны:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении публичных зон:', error);
      return rejectWithValue('Не удалось загрузить публичные зоны');
    }
  }
);

// Получение личных зон
export const fetchPrivateAreas = createAsyncThunk(
  'huntingAreas/fetchPrivate',
  async (_, { rejectWithValue }) => {
    console.log('Отправка GET-запроса для получения личных зон...');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/hunting-areas/private`);
      console.log('Получены личные зоны:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении личных зон:', error);
      return rejectWithValue('Не удалось загрузить личные зоны');
    }
  }
);