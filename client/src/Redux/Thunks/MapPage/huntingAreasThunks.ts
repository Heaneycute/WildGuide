import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { HuntingArea } from '../../../types/MapPage/HuntingAreaType';

// Загрузка всех охотничьих зон
export const fetchHuntingAreas = createAsyncThunk(
  'huntingAreas/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/hunting-areas');
      return response.data;
    } catch (error) {
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