import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHuntingAreas } from '../../Thunks/MapPage/huntingAreasThunks';
import { RootState } from '../../index';

interface HuntingArea {
  id: number;
  name: string;
  description: string;
  coordinates: number[][];
  userId: number | null;
}

interface HuntingAreasState {
  areas: HuntingArea[];
  selectedArea: HuntingArea | null;
  isVisible: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: HuntingAreasState = {
  areas: [],
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
      state.selectedArea = action.payload;
    },
    clearSelectedArea: (state) => {
      state.selectedArea = null;
    },
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHuntingAreas.pending, (state) => {
        console.log('Загрузка охотничьих зон...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHuntingAreas.fulfilled, (state, action) => {
        console.log('Охотничьи зоны загружены:', action.payload);
        state.areas = action.payload;
        state.loading = false;
      })
      .addCase(fetchHuntingAreas.rejected, (state, action) => {
        console.error('Ошибка при загрузке охотничьих зон:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectArea, clearSelectedArea } = huntingAreasSlice.actions;

// Селекторы
export const selectAllAreas = (state: RootState) => state.huntingAreas.areas;
export const selectSelectedArea = (state: RootState) => state.huntingAreas.selectedArea;
export const selectAreasLoading = (state: RootState) => state.huntingAreas.loading;
export const selectAreasError = (state: RootState) => state.huntingAreas.error;
export const setVisibility = (state: RootState) => state.huntingAreas.selectedArea;

export default huntingAreasSlice.reducer;