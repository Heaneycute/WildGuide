import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { HuntingArea } from '../../../types/MapPage/HuntingAreaType';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Загрузка всех охотничьих зон
export const fetchHuntingAreas = createAsyncThunk(
  'huntingAreas/fetch',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Отправка запроса к API...');
      const response = await axios.get(`${import.meta.env.VITE_API}/hunting-areas`);
      console.log('Получен ответ:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка запроса:', error);
      return rejectWithValue('Не удалось загрузить охотничьи зоны');
    }
  }
);

/* 
Будущие функции для реализации:
- createHuntingArea: создание новой зоны
- updateHuntingArea: обновление существующей зоны
- deleteHuntingArea: удаление зоны
- fetchPublicAreas: получение публичных зон
- fetchPrivateAreas: получение личных зон
*/