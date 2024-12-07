import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayersState {
  hunting: boolean;
  animals: boolean;
  cabins: boolean;
  trails: boolean;
  points: boolean;
}

const initialState: LayersState = {
  hunting: true,
  animals: false,
  cabins: false,
  trails: false,
  points: true
};

 const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    toggleLayer: (state, action: PayloadAction<keyof LayersState>) => {
      state[action.payload] = !state[action.payload];
    },
    setLayerState: (state, action: PayloadAction<{layer: keyof LayersState; value: boolean}>) => {
      state[action.payload.layer] = action.payload.value;
    }
  }
});

export const { toggleLayer, setLayerState } = layersSlice.actions;
export default layersSlice.reducer;