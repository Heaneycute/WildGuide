import { createSlice } from '@reduxjs/toolkit';

interface AnimalsState {
  animals: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AnimalsState = {
  animals: [],
  loading: false,
  error: null,
};

export const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {},
});

export default animalsSlice.reducer;