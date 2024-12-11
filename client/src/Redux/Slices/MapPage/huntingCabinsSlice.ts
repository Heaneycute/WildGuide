// Импорт необходимых зависимостей и типов для работы со слайсом охотничьих домиков
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHuntingCabins, createHuntingCabin, updateHuntingCabin, deleteHuntingCabin } from '../../Thunks/MapPage/huntingCabinsThunks';
import { RootState } from '../../index';

// Определение интерфейса для охотничьего домика
interface HuntingCabin {
  id: string;                     // Уникальный идентификатор
  name: string;                   // Название домика
  description: string;            // Описание домика
  huntingAreaId: string;          // Привязка к угодью (FK)
  capacity: number;               // Вместимость
  buildingType: string;           // Тип строения
  seasonality: string;            // Сезонность
  amenities: {                    // Удобства
    electricity: boolean;         // Электричество
    heating: boolean;            // Отопление
    kitchen: boolean;            // Кухня
    bathroom: boolean;           // Санузел
  };
  bookingRules: string;          // Правила бронирования
  price: number;                 // Цена
  accessibility: string;         // Транспортная доступность
  coordinates: [number, number]; // Координаты на карте
  availability: boolean;         // Доступность
}

// Определение состояния слайса охотничьих домиков
interface HuntingCabinsState {
  cabins: HuntingCabin[];           // Массив всех домиков
  selectedCabin: HuntingCabin | null; // Выбранный домик
  loading: boolean;                  // Состояние загрузки
  error: string | null;             // Ошибки при выполнении операций
}

// Начальное состояние
const initialState: HuntingCabinsState = {
  cabins: [],
  selectedCabin: null,
  loading: false,
  error: null,
};

// Создание слайса для управления охотничьими домиками
export const huntingCabinsSlice = createSlice({
  name: 'huntingCabins',
  initialState,
  reducers: {
    // Выбор домика
    selectCabin: (state, action: PayloadAction<HuntingCabin>) => {
      console.log('Выбран домик:', action.payload);
      state.selectedCabin = action.payload;
    },
    // Очистка выбранного домика
    clearSelectedCabin: (state) => {
      console.log('Очищен выбранный домик');
      state.selectedCabin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение всех домиков
      .addCase(fetchHuntingCabins.pending, (state) => {
        console.log('Начало загрузки охотничьих домиков...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHuntingCabins.fulfilled, (state, action) => {
        console.log('Охотничьи домики успешно загружены:', action.payload);
        state.cabins = action.payload;
        state.loading = false;
      })
      .addCase(fetchHuntingCabins.rejected, (state, action) => {
        console.error('Ошибка при загрузке охотничьих домиков:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      // Создание домика
      .addCase(createHuntingCabin.fulfilled, (state, action) => {
        console.log('Домик успешно создан:', action.payload);
        state.cabins.push(action.payload);
      })
      // Обновление домика
      .addCase(updateHuntingCabin.fulfilled, (state, action) => {
        console.log('Обновление домика:', action.payload);
        const index = state.cabins.findIndex(cabin => cabin.id === action.payload.id);
        if (index !== -1) {
          state.cabins[index] = action.payload;
        }
      })
      // Удаление домика
      .addCase(deleteHuntingCabin.fulfilled, (state, action) => {
        console.log('Удаление домика с ID:', action.payload);
        state.cabins = state.cabins.filter(cabin => cabin.id !== action.payload);
      });
  },
});

// Экспорт actions
export const { selectCabin, clearSelectedCabin } = huntingCabinsSlice.actions;

// Селекторы для получения данных из state
export const selectAllCabins = (state: RootState) => state.huntingCabins.cabins;
export const selectSelectedCabin = (state: RootState) => state.huntingCabins.selectedCabin;
export const selectCabinsLoading = (state: RootState) => state.huntingCabins.loading;
export const selectCabinsError = (state: RootState) => state.huntingCabins.error;

export default huntingCabinsSlice.reducer;