// src/Redux/Thunks/MapPage/favoritesThunks.tsНовая
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Настройка axios с перехватчиком для авторизации
const setupAxiosInterceptors = () => {
  const token = localStorage.getItem('accessToken');
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
  
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Инициализация перехватчиков
setupAxiosInterceptors();

// Получение всех избранных элементов пользователя
export const fetchFavorites = createAsyncThunk(
  'favorites/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/favorites`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить избранное');
    }
  }
);

// Добавление нового элемента в избранное
export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/favorites`, data);
      await dispatch(fetchFavorites()); // Обновляем весь список после добавления
      return response.data;
    } catch (error) {
      return rejectWithValue('Не удалось добавить в избранное');
    }
  }
);

// Удаление элемента из избранного
export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/favorites/${id}`);
      await dispatch(fetchFavorites()); // Обновляем весь список после удаления
      return id;
    } catch (error) {
      return rejectWithValue('Не удалось удалить из избранного');
    }
  }
);