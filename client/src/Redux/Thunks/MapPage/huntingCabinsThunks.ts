// src/Redux/Thunks/MapPage/huntingCabinsThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Получение всех домиков
export const fetchHuntingCabins = createAsyncThunk(
  'huntingCabins/fetch',
  async (_, { rejectWithValue }) => {
    console.log('Отправка GET-запроса...');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/hunting-cabins`);
      console.log('Получены данные:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении домиков:', error);
      return rejectWithValue('Не удалось загрузить охотничьи домики');
    }
  }
);

// Создание нового домика (требует авторизации)
export const createHuntingCabin = createAsyncThunk(
  'huntingCabins/create',
  async (data: any, { rejectWithValue }) => {
    console.log('Отправка POST-запроса...');
    console.log('Данные для создания:', data);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/hunting-cabins`, data);
      console.log('Создан новый домик:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании домика:', error);
      return rejectWithValue('Не удалось создать охотничий домик');
    }
  }
);

// Частичное обновление домика (требует авторизации)
export const updateHuntingCabin = createAsyncThunk(
  'huntingCabins/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    console.log(`Отправка PATCH-запроса для ID: ${id}`);
    console.log('Данные для обновления:', data);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}/hunting-cabins/${id}`, data);
      console.log('Домик обновлен:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении домика:', error);
      return rejectWithValue('Не удалось обновить охотничий домик');
    }
  }
);

// Удаление домика (требует прав админа)
export const deleteHuntingCabin = createAsyncThunk(
  'huntingCabins/delete',
  async (id: string, { rejectWithValue }) => {
    console.log(`Отправка DELETE-запроса для ID: ${id}`);
    try {
      await axios.delete(`${import.meta.env.VITE_API}/hunting-cabins/${id}`);
      console.log('Домик успешно удален');
      return id;
    } catch (error) {
      console.error('Ошибка при удалении домика:', error);
      return rejectWithValue('Не удалось удалить охотничий домик');
    }
  }
);