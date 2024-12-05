// Импортируем createSlice из Redux Toolkit для создания слайса
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем интерфейс для охотничьих угодий
interface HuntingArea {
  id: string;
  name: string;
  coordinates: number[][];
  description?: string;
}

// Определяем структуру состояния для слайса охотничьих угодий
interface HuntingAreasState {
  // Массив охотничьих угодий, получаемый из API
  areas: HuntingArea[];
  // Флаг загрузки данных
  loading: boolean;
  // Сообщение об ошибке, если что-то пошло не так
  error: string | null;
  // Выбранная область на карте
  selectedArea: string | null;
}

// Начальное состояние слайса
const initialState: HuntingAreasState = {
  areas: [],
  loading: false,
  error: null,
  selectedArea: null
};

// Создаем слайс для управления охотничьими угодьями
export const huntingAreasSlice = createSlice({
  name: 'huntingAreas',
  initialState,
  reducers: {
    // Действие при начале загрузки данных
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Действие при успешной загрузке данных
    setAreas: (state, action: PayloadAction<HuntingArea[]>) => {
      state.areas = action.payload;
      state.loading = false;
    },
    // Действие при возникновении ошибки
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Действие при выборе области на карте
    setSelectedArea: (state, action: PayloadAction<string | null>) => {
      state.selectedArea = action.payload;
    }
  },
});

// Экспортируем actions для использования в компонентах
export const { setLoading, setAreas, setError, setSelectedArea } = huntingAreasSlice.actions;

// Экспортируем reducer для использования в store
export default huntingAreasSlice.reducer;