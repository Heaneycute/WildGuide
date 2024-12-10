// Импорт необходимых зависимостей и типов
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRoutes, createRoute, updateRoute, deleteRoute, verifyRoute } from '../../Thunks/MapPage/routesThunks';
import { RootState } from '../../index';

// Определение типа маршрута
interface Route {
  id: string;
  name: string;
  description: string;
  coordinates: number[][]; // Массив координат для отображения на карте
  userId: string;         // ID пользователя-создателя маршрута
  isVerified: boolean;    // Статус верификации маршрута
}

// Определение состояния слайса
interface RoutesState {
  routes: Route[];           // Массив всех маршрутов
  selectedRoute: Route | null; // Выбранный маршрут
  loading: boolean;          // Состояние загрузки
  error: string | null;      // Ошибки при выполнении операций
}

// Начальное состояние
const initialState: RoutesState = {
  routes: [],
  selectedRoute: null,
  loading: false,
  error: null,
};

// Создание слайса для управления маршрутами
export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    // Выбор маршрута
    selectRoute: (state, action: PayloadAction<Route>) => {
      console.log('Выбран маршрут:', action.payload);
      state.selectedRoute = action.payload;
    },
    // Очистка выбранного маршрута
    clearSelectedRoute: (state) => {
      console.log('Очищен выбранный маршрут');
      state.selectedRoute = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение всех маршрутов
      .addCase(fetchRoutes.pending, (state) => {
        console.log('Начало загрузки маршрутов...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        console.log('Маршруты успешно загружены:', action.payload);
        state.routes = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        console.error('Ошибка при загрузке маршрутов:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      // Создание нового маршрута
      .addCase(createRoute.pending, (state) => {
        console.log('Начало создания нового маршрута...');
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoute.fulfilled, (state, action) => {
        console.log('Маршрут успешно создан:', action.payload);
        state.routes.push(action.payload);
        state.loading = false;
      })
      .addCase(createRoute.rejected, (state, action) => {
        console.error('Ошибка при создании маршрута:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      // Обновление существующего маршрута
      .addCase(updateRoute.fulfilled, (state, action) => {
        console.log('Обновление маршрута:', action.payload);
        const index = state.routes.findIndex(route => route.id === action.payload.id);
        if (index !== -1) {
          state.routes[index] = action.payload;
        }
      })
      // Удаление маршрута
      .addCase(deleteRoute.fulfilled, (state, action) => {
        console.log('Удаление маршрута с ID:', action.payload);
        state.routes = state.routes.filter(route => route.id !== action.payload);
      })
      // Верификация маршрута
      .addCase(verifyRoute.fulfilled, (state, action) => {
        console.log('Верификация маршрута:', action.payload);
        const index = state.routes.findIndex(route => route.id === action.payload.id);
        if (index !== -1) {
          state.routes[index] = action.payload;
        }
      });
  },
});

// Экспорт actions
export const { selectRoute, clearSelectedRoute } = routesSlice.actions;

// Селекторы для получения данных из state
export const selectAllRoutes = (state: RootState) => state.routes.routes;
export const selectSelectedRoute = (state: RootState) => state.routes.selectedRoute;
export const selectRoutesLoading = (state: RootState) => state.routes.loading;
export const selectRoutesError = (state: RootState) => state.routes.error;

export default routesSlice.reducer;