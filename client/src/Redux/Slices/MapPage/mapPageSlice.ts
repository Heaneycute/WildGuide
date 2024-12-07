import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MapPageState {
  layers: {
    hunting: boolean;
    animals: boolean;
    routes: boolean;
    cabins: boolean;
  };
}

const initialState: MapPageState = {
  layers: {
    hunting: true,
    animals: true,
    routes: true,
    cabins: true,
  },
};

export const mapPageSlice = createSlice({
  name: 'mapPage',
  initialState,
  reducers: {
    toggleLayer: (state, action: PayloadAction<keyof MapPageState['layers']>) => {
      state.layers[action.payload] = !state.layers[action.payload];
    },
  },
});

export const { toggleLayer } = mapPageSlice.actions;
export default mapPageSlice.reducer;