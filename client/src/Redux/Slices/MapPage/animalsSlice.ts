// Импорт необходимых зависимостей и типов
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAnimals, fetchAnimalById, createAnimal, updateAnimal, deleteAnimal } from '../../Thunks/MapPage/animalsThunks';
import { RootState } from '../../index';

// Определение интерфейса для животного
interface Animal {
  id: string;            
  name: string;          
  description: string;   
  category: string;      // Категория животного
  huntingSeason: {       // Сезон охоты в формате JSON
    start: string;
    end: string;
  };
  lastLocations: {       // Последние локации в формате JSON
    coordinates: [number, number];
    timestamp: string;
  }[];
  populationDensity: number; // Плотность популяции
  conservationStatus: string; // Охранный статус
  createdBy: string;         // ID создателя записи
}

// Определение состояния слайса
interface AnimalsState {
  animals: Animal[];           
  selectedAnimal: Animal | null;
  loading: boolean;            
  error: string | null;        
}

// Начальное состояние
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
    selectAnimal: (state, action: PayloadAction<Animal>) => {
      console.log('[Animals] Выбрано животное:', action.payload);
      state.selectedAnimal = action.payload;
    },
    clearSelectedAnimal: (state) => {
      console.log('[Animals] Очищено выбранное животное');
      state.selectedAnimal = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение всех животных
      .addCase(fetchAnimals.pending, (state) => {
        console.log('[Animals] Начало загрузки животных...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        console.log('[Animals] Животные успешно загружены:', action.payload);
        state.animals = action.payload;
        state.loading = false;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        console.error('[Animals] Ошибка при загрузке животных:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      // Получение животного по ID
      .addCase(fetchAnimalById.fulfilled, (state, action) => {
        console.log('[Animals] Загружено животное по ID:', action.payload);
        state.selectedAnimal = action.payload;
      })
      // Создание нового животного
      .addCase(createAnimal.fulfilled, (state, action) => {
        console.log('[Animals] Животное успешно создано:', action.payload);
        state.animals.push(action.payload);
      })
      // Обновление существующего животного
      .addCase(updateAnimal.fulfilled, (state, action) => {
        console.log('[Animals] Обновление животного:', action.payload);
        const index = state.animals.findIndex(animal => animal.id === action.payload.id);
        if (index !== -1) {
          state.animals[index] = action.payload;
        }
      })
      // Удаление животного
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        console.log('[Animals] Удаление животного с ID:', action.payload);
        state.animals = state.animals.filter(animal => animal.id !== action.payload);
      });
  },
});

// Экспорт actions
export const { selectAnimal, clearSelectedAnimal } = animalsSlice.actions;

// Селекторы
export const selectAllAnimals = (state: RootState) => state.animals.animals;
export const selectSelectedAnimal = (state: RootState) => state.animals.selectedAnimal;
export const selectAnimalsLoading = (state: RootState) => state.animals.loading;
export const selectAnimalsError = (state: RootState) => state.animals.error;

export default animalsSlice.reducer;