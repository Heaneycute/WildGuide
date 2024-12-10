// src/Redux/Thunks/MapPage/commentsThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Получение комментариев
export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async ({ itemType, itemId }: { itemType: string; itemId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/comments/${itemType}/${itemId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить комментарии');
    }
  }
);

// Создание комментария
export const createComment = createAsyncThunk(
  'comments/create',
  async (data: { itemType: string; itemId: number; content: string; rating?: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/comments`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue('Не удалось создать комментарий');
    }
  }
);

// Обновление комментария
export const updateComment = createAsyncThunk(
  'comments/update',
  async ({ id, data }: { id: number; data: { content: string; rating?: number } }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}/comments/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue('Не удалось обновить комментарий');
    }
  }
);

// Удаление комментария
export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/comments/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue('Не удалось удалить комментарий');
    }
  }
);