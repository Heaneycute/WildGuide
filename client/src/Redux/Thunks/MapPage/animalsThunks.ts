// src/Redux/Thunks/MapPage/animalsThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Получение всех животных
export const fetchAnimals = createAsyncThunk(
  'animals/fetch',
  async (_, { rejectWithValue }) => {
    console.log('Отправка GET-запроса для получения животных...');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/animals`);
      console.log('Получены данные:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении животных:', error);
      return rejectWithValue('Не удалось загрузить животных');
    }
  }
);

// Получение животного по ID
export const fetchAnimalById = createAsyncThunk(
  'animals/fetchById',
  async (id: string, { rejectWithValue }) => {
    console.log(`Отправка GET-запроса для получения животного ${id}...`);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/animals/${id}`);
      console.log('Получены данные о животном:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении животного:', error);
      return rejectWithValue('Не удалось загрузить информацию о животном');
    }
  }
);

// Создание записи о животном (требует прав админа)
export const createAnimal = createAsyncThunk(
  'animals/create',
  async (data: any, { rejectWithValue }) => {
    console.log('Отправка POST-запроса для создания животного...');
    console.log('Данные для создания:', data);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/animals`, data);
      console.log('Создана новая запись:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании записи:', error);
      return rejectWithValue('Не удалось создать запись о животном');
    }
  }
);

// Обновление информации о животном (требует прав админа)
export const updateAnimal = createAsyncThunk(
  'animals/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    console.log(`Отправка PUT-запроса для обновления животного ${id}...`);
    console.log('Данные для обновления:', data);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API}/animals/${id}`, data);
      console.log('Информация обновлена:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
      return rejectWithValue('Не удалось обновить информацию о животном');
    }
  }
);

// Удаление записи о животном (требует прав админа)
export const deleteAnimal = createAsyncThunk(
  'animals/delete',
  async (id: string, { rejectWithValue }) => {
    console.log(`Отправка DELETE-запроса для удаления животного ${id}...`);
    try {
      await axios.delete(`${import.meta.env.VITE_API}/animals/${id}`);
      console.log('Запись успешно удалена');
      return id;
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      return rejectWithValue('Не удалось удалить запись о животном');
    }
  }
);