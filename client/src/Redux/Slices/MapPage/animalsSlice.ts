// Импорт необходимых зависимостей и типов для работы со слайсом животных
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAnimals, fetchAnimalById, createAnimal, updateAnimal, deleteAnimal } from '../../Thunks/MapPage/animalsThunks';
import { RootState } from '../../index';

// Определение интерфейса для животного
interface Animal {
  id: string;            // Уникальный идентификатор
  name: string;          // Название животного
  description: string;   // Описание животного
  habitat: string[];     // Места обитания
  seasonality: string[]; // Сезонность охоты
  dangerLevel: number;   // Уровень опасности
}

// Определение состояния слайса животных
interface AnimalsState {
  animals: Animal[];           // Массив всех животных
  selectedAnimal: Animal | null; // Выбранное животное
  loading: boolean;            // Состояние загрузки
  error: string | null;        // Ошибки при выполнении операций
}

// Начальное состояние слайса
const initialState: AnimalsState = {
  animals: [],
  selectedAnimal: null,
  loading: false,
  error: null,
};

// Создание слайса для управления данными о животных
export const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    // Выбор животного
    selectAnimal: (state, action: PayloadAction<Animal>) => {
      console.log('Выбрано животное:', action.payload);
      state.selectedAnimal = action.payload;
    },
    // Очистка выбранного животного
    clearSelectedAnimal: (state) => {
      console.log('Очищено выбранное животное');
      state.selectedAnimal = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение всех животных
      .addCase(fetchAnimals.pending, (state) => {
        console.log('Начало загрузки списка животных...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        console.log('Список животных успешно загружен:', action.payload);
        state.animals = action.payload;
        state.loading = false;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        console.error('Ошибка при загрузке списка животных:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      // Получение животного по ID
      .addCase(fetchAnimalById.fulfilled, (state, action) => {
        console.log('Получено животное по ID:', action.payload);
        state.selectedAnimal = action.payload;
      })
      // Создание нового животного
      .addCase(createAnimal.fulfilled, (state, action) => {
        console.log('Создано новое животное:', action.payload);
        state.animals.push(action.payload);
      })
      // Обновление существующего животного
      .addCase(updateAnimal.fulfilled, (state, action) => {
        console.log('Обновление животного:', action.payload);
        const index = state.animals.findIndex(animal => animal.id === action.payload.id);
        if (index !== -1) {
          state.animals[index] = action.payload;
        }
      })
      // Удаление животного
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        console.log('Удаление животного с ID:', action.payload);
        state.animals = state.animals.filter(animal => animal.id !== action.payload);
      });
  },
});

// Экспорт actions
export const { selectAnimal, clearSelectedAnimal } = animalsSlice.actions;

// Селекторы для получения данных из state
export const selectAllAnimals = (state: RootState) => state.animals.animals;
export const selectSelectedAnimal = (state: RootState) => state.animals.selectedAnimal;
export const selectAnimalsLoading = (state: RootState) => state.animals.loading;
export const selectAnimalsError = (state: RootState) => state.animals.error;

export default animalsSlice.reducer;