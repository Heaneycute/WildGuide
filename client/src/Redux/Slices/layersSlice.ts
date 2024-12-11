import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface LayersState {
  hunting: boolean;
  animals: boolean;
  cabins: boolean;
  trails: boolean;
  points: boolean;
}

const initialState: LayersState = {
  hunting: true,
  animals: true,
  cabins: true,
  trails: true,
  points: true
};

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    toggleLayer: (state, action: PayloadAction<keyof LayersState>) => {
      const layer = action.payload;
      state[layer] = !state[layer];
    },
    setLayerVisibility: (state, action: PayloadAction<{layer: keyof LayersState, visible: boolean}>) => {
      const { layer, visible } = action.payload;
      state[layer] = visible;
    }
  }
});

export const { toggleLayer, setLayerVisibility } = layersSlice.actions;

export const selectLayerVisibility = (state: RootState, layer: keyof LayersState) => state.layers[layer];

export default layersSlice.reducer;