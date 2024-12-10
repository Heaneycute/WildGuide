/**
 * Слайс для управления охотничьими зонами на карте
 * Отвечает за отображение, создание, редактирование и удаление зон охоты
 * Также управляет состоянием загрузки и обработкой ошибок
 */

// Импорт необходимых зависимостей
import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  fetchHuntingAreas,
  createHuntingArea,
  updateHuntingArea,
  deleteHuntingArea,
  fetchPublicAreas,
  fetchPrivateAreas
} from '../../Thunks/MapPage/huntingAreasThunks';
import { RootState } from '../../index';

// Определение типа охотничьей зоны
interface HuntingArea {
  id: number;          // Уникальный идентификатор зоны
  name: string;        // Название зоны
  description: string; // Описание зоны
  coordinates: number[][]; // Массив координат для отображения на карте
  userId: number | null;   // ID пользователя-владельца зоны
}

/**
 * Интерфейс состояния слайса
 * Содержит все необходимые данные для управления зонами охоты
 */
interface HuntingAreasState {
  areas: HuntingArea[];           // Массив всех зон
  selectedArea: HuntingArea | null; // Выбранная зона
  isVisible: boolean;             // Видимость слоя на карте
  loading: boolean;               // Состояние загрузки
  error: string | null;           // Ошибки при выполнении операций
}

// Начальное состояние слайса
const initialState: HuntingAreasState = {
  areas: [],
  selectedArea: null,
  isVisible: true,
  loading: false,
  error: null,
};

/**
 * Создание слайса для управления охотничьими зонами
 * Содержит редьюсеры для основных операций с зонами
 */
export const huntingAreasSlice = createSlice({
  name: 'huntingAreas',
  initialState,
  reducers: {
    // Выбор зоны для просмотра или редактирования
    selectArea: (state, action: PayloadAction<HuntingArea>) => {
      console.log('[HuntingAreas] Выбрана зона:', action.payload);
      state.selectedArea = action.payload;
    },
    // Очистка выбранной зоны
    clearSelectedArea: (state) => {
      console.log('[HuntingAreas] Очищена выбранная зона');
      state.selectedArea = null;
    },
    // Управление видимостью слоя зон на карте
    setVisibility: (state, action: PayloadAction<boolean>) => {
      console.log('[HuntingAreas] Изменена видимость слоя:', action.payload);
      state.isVisible = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Загрузка всех зон
      .addCase(fetchHuntingAreas.pending, (state) => {
        console.log('[HuntingAreas] Начало загрузки охотничьих зон...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHuntingAreas.fulfilled, (state, action) => {
        console.log('[HuntingAreas] Охотничьи зоны успешно загружены:', action.payload);
        state.areas = action.payload;
        state.loading = false;
      })
      .addCase(fetchHuntingAreas.rejected, (state, action) => {
        console.error('[HuntingAreas] Ошибка при загрузке охотничьих зон:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Создание новой зоны
      .addCase(createHuntingArea.pending, (state) => {
        console.log('[HuntingAreas] Начало создания новой зоны...');
        state.loading = true;
        state.error = null;
      })
      .addCase(createHuntingArea.fulfilled, (state, action) => {
        console.log('[HuntingAreas] Зона успешно создана:', action.payload);
        state.areas.push(action.payload);
        state.loading = false;
      })
      .addCase(createHuntingArea.rejected, (state, action) => {
        console.error('[HuntingAreas] Ошибка при создании зоны:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Обновление существующей зоны
      .addCase(updateHuntingArea.fulfilled, (state, action) => {
        console.log('[HuntingAreas] Обновление зоны:', action.payload);
        const index = state.areas.findIndex(area => area.id === action.payload.id);
        if (index !== -1) {
          state.areas[index] = action.payload;
        }
      })

      // Удаление зоны
      .addCase(deleteHuntingArea.fulfilled, (state, action) => {
        console.log('[HuntingAreas] Удаление зоны с ID:', action.payload);
        state.areas = state.areas.filter(area => area.id !== action.payload);
      })

      // Загрузка публичных зон
      .addCase(fetchPublicAreas.fulfilled, (state, action) => {
        console.log('[HuntingAreas] Загружены публичные зоны:', action.payload);
        state.areas = action.payload;
        state.loading = false;
      })

      // Загрузка личных зон пользователя
      .addCase(fetchPrivateAreas.fulfilled, (state, action) => {
        console.log('[HuntingAreas] Загружены личные зоны:', action.payload);
        state.areas = action.payload;
        state.loading = false;
      });
  },
});

// Экспорт actions для использования в компонентах
export const { selectArea, clearSelectedArea } = huntingAreasSlice.actions;

/**
 * Селекторы для получения данных из state
 * Используются в компонентах для доступа к данным слайса
 */
export const selectAllAreas = (state: RootState) => state.huntingAreas.areas;
export const selectSelectedArea = (state: RootState) => state.huntingAreas.selectedArea;
export const selectAreasLoading = (state: RootState) => state.huntingAreas.loading;
export const selectAreasError = (state: RootState) => state.huntingAreas.error;
export const setVisibility = (state: RootState) => state.huntingAreas.selectedArea;

export default huntingAreasSlice.reducer;