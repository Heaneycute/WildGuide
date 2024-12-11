import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavorites, addToFavorites, removeFromFavorites } from '../../Thunks/MapPage/favoritesThunks';
import { RootState } from '../../index';

// Определение интерфейса для элемента избранного
interface FavoriteItem {
  id: string;                    // Уникальный идентификатор
  type: 'route' | 'cabin' | 'area' | 'animal' | 'weapon'; // Тип элемента
  itemId: string;               // ID связанного элемента
  userId: string;               // ID пользователя
  dateAdded: Date;             // Дата добавления в избранное
  notes?: string;              // Опциональные заметки пользователя
}

// Определение состояния слайса избранного
interface FavoritesState {
  items: FavoriteItem[];        // Массив избранных элементов
  loading: boolean;             // Состояние загрузки
  error: string | null;         // Ошибки при выполнении операций
  currentItem: FavoriteItem | null; // Текущий просматриваемый элемент
}

// Начальное состояние
const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
  currentItem: null
};

// Создание слайса для управления избранным
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setCurrentItem: (state, action: PayloadAction<FavoriteItem | null>) => {
      state.currentItem = action.payload;
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    updateNotes: (state, action: PayloadAction<{id: string, notes: string}>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.notes = action.payload.notes;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Получение списка избранного
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Добавление элемента в избранное
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Удаление элемента из избранного
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentItem?.id === action.payload) {
          state.currentItem = null;
        }
      });
  },
});

// Экспорт actions
export const { setCurrentItem, clearCurrentItem, updateNotes } = favoritesSlice.actions;

// Селекторы для получения данных из state
export const selectAllFavorites = (state: RootState) => state.favorites.items;
export const selectFavoritesLoading = (state: RootState) => state.favorites.loading;
export const selectFavoritesError = (state: RootState) => state.favorites.error;
export const selectCurrentFavorite = (state: RootState) => state.favorites.currentItem;

export default favoritesSlice.reducer;