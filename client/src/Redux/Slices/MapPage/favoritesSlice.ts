// Импорт необходимых зависимостей для работы со слайсом избранного
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavorites, addToFavorites, removeFromFavorites } from '../../Thunks/MapPage/favoritesThunks';
import { RootState } from '../../index';

// Определение интерфейса для элемента избранного
interface FavoriteItem {
  id: string;                    // Уникальный идентификатор
  type: 'route' | 'cabin' | 'area'; // Тип элемента (маршрут, домик или зона)
  itemId: string;               // ID связанного элемента
  userId: string;               // ID пользователя
}

// Определение состояния слайса избранного
interface FavoritesState {
  items: FavoriteItem[];        // Массив избранных элементов
  loading: boolean;             // Состояние загрузки
  error: string | null;         // Ошибки при выполнении операций
}

// Начальное состояние
const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
};

// Создание слайса для управления избранным
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получение списка избранного
      .addCase(fetchFavorites.pending, (state) => {
        console.log('Начало загрузки списка избранного...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        console.log('Список избранного успешно загружен:', action.payload);
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        console.error('Ошибка при загрузке списка избранного:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      // Добавление элемента в избранное
      .addCase(addToFavorites.fulfilled, (state, action) => {
        console.log('Элемент успешно добавлен в избранное:', action.payload);
        state.items.push(action.payload);
      })
      // Удаление элемента из избранного
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        console.log('Элемент удален из избранного, ID:', action.payload);
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

// Селекторы для получения данных из state
export const selectAllFavorites = (state: RootState) => state.favorites.items;
export const selectFavoritesLoading = (state: RootState) => state.favorites.loading;
export const selectFavoritesError = (state: RootState) => state.favorites.error;

export default favoritesSlice.reducer;