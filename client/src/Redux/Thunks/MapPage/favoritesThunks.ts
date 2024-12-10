// src/Redux/Thunks/MapPage/favoritesThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Получение всех избранных элементов пользователя
export const fetchFavorites = createAsyncThunk(
  'favorites/fetch',
  async (_, { rejectWithValue }) => {
    console.log('Отправка GET-запроса для получения избранного...');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/favorites`);
      console.log('Получены данные об избранном:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении избранного:', error);
      return rejectWithValue('Не удалось загрузить избранное');
    }
  }
);

// Добавление нового элемента в избранное
export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async (data: any, { rejectWithValue }) => {
    console.log('Отправка POST-запроса для добавления в избранное...');
    console.log('Данные для добавления:', data);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/favorites`, data);
      console.log('Добавлено в избранное:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
      return rejectWithValue('Не удалось добавить в избранное');
    }
  }
);

// Удаление элемента из избранного
export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async (id: string, { rejectWithValue }) => {
    console.log(`Отправка DELETE-запроса для удаления из избранного ${id}...`);
    try {
      await axios.delete(`${import.meta.env.VITE_API}/favorites/${id}`);
      console.log('Успешно удалено из избранного');
      return id;
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
      return rejectWithValue('Не удалось удалить из избранного');
    }
  }
);