import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHuntingAreas, createHuntingArea, updateHuntingArea, deleteHuntingArea, fetchPublicAreas, fetchPrivateAreas} from '../../Thunks/MapPage/huntingAreasThunks';
import { RootState } from '../../index';

interface HuntingArea {
  id: number;
  name: string;
  description: string;
  terrainType: string;
  landscape: string;
  altitude: number;
  size: number;
  allowedHuntingTypes: string[];
  huntingSeasons: {
    start: Date;
    end: Date;
  }[];
  restrictions: string[];
  infrastructure: string[];
  waterSources: string[];
  requiredPermits: string[];
  administrationContacts: {
    phone: string;
    email: string;
    address: string;
  };
  coordinates: [number, number][];
  cabins?: number[];
  routes?: number[];
  userId: number | null;
}

interface HuntingAreasState {
  areas: HuntingArea[];
  publicAreas: HuntingArea[];
  privateAreas: HuntingArea[];
  selectedArea: HuntingArea | null;
  isVisible: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: HuntingAreasState = {
  areas: [],
  publicAreas: [],
  privateAreas: [],
  selectedArea: null,
  isVisible: true,
  loading: false,
  error: null,
};

export const huntingAreasSlice = createSlice({
  name: 'huntingAreas',
  initialState,
  reducers: {
    selectArea: (state, action: PayloadAction<HuntingArea>) => {
      console.log('[HuntingAreas] Выбрана зона:', action.payload);
      state.selectedArea = action.payload;
    },
    clearSelectedArea: (state) => {
      console.log('[HuntingAreas] Очищена выбранная зона');
      state.selectedArea = null;
    },
    setVisibility: (state, action: PayloadAction<boolean>) => {
      console.log('[HuntingAreas] Изменена видимость слоя:', action.payload);
      state.isVisible = action.payload;
    },
    updateAreaData: (state, action: PayloadAction<{ id: number, data: Partial<HuntingArea> }>) => {
      console.log('[HuntingAreas] Обновление данных зоны:', action.payload);
      const index = state.areas.findIndex(area => area.id === action.payload.id);
      if (index !== -1) {
        state.areas[index] = { ...state.areas[index], ...action.payload.data };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Получение всех зон
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
      // Публичные зоны
      .addCase(fetchPublicAreas.fulfilled, (state, action) => {
        console.log('[HuntingAreas] Загружены публичные зоны:', action.payload);
        state.publicAreas = action.payload;
        state.loading = false;
      })
      // Личные зоны
      .addCase(fetchPrivateAreas.fulfilled, (state, action) => {
        console.log('[HuntingAreas] Загружены личные зоны:', action.payload);
        state.privateAreas = action.payload;
        state.loading = false;
      })
      // Создание зоны
      .addCase(createHuntingArea.fulfilled, (state, action) => {
        console.log('[HuntingAreas] Зона успешно создана:', action.payload);
        state.areas.push(action.payload);
        if (action.payload.userId) {
          state.privateAreas.push(action.payload);
        } else {
          state.publicAreas.push(action.payload);
        }
      })
      // Обновление зоны
      .addCase(updateHuntingArea.fulfilled, (state, action) => {
        console.log('[HuntingAreas] Обновление зоны:', action.payload);
        const updateArea = (areas: HuntingArea[]) => {
          const index = areas.findIndex(area => area.id === action.payload.id);
          if (index !== -1) {
            areas[index] = action.payload;
          }
        };
        
        updateArea(state.areas);
        updateArea(state.publicAreas);
        updateArea(state.privateAreas);
        
        if (state.selectedArea?.id === action.payload.id) {
          state.selectedArea = action.payload;
        }
      })
      // Удаление зоны
      .addCase(deleteHuntingArea.fulfilled, (state, action) => {
        console.log('[HuntingAreas] Удаление зоны с ID:', action.payload);
        state.areas = state.areas.filter(area => area.id !== action.payload);
        state.publicAreas = state.publicAreas.filter(area => area.id !== action.payload);
        state.privateAreas = state.privateAreas.filter(area => area.id !== action.payload);
        
        if (state.selectedArea?.id === action.payload) {
          state.selectedArea = null;
        }
      });
  },
});

export const { selectArea, clearSelectedArea, setVisibility, updateAreaData } = huntingAreasSlice.actions;

export const selectAllAreas = (state: RootState) => state.huntingAreas.areas;
export const selectPublicAreas = (state: RootState) => state.huntingAreas.publicAreas;
export const selectPrivateAreas = (state: RootState) => state.huntingAreas.privateAreas;
export const selectSelectedArea = (state: RootState) => state.huntingAreas.selectedArea;
export const selectAreasLoading = (state: RootState) => state.huntingAreas.loading;
export const selectAreasError = (state: RootState) => state.huntingAreas.error;
export const selectAreasVisibility = (state: RootState) => state.huntingAreas.isVisible;

export default huntingAreasSlice.reducer;