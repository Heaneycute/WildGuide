import { createSlice } from '@reduxjs/toolkit';

interface RoutesState {
  routes: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RoutesState = {
  routes: [],
  loading: false,
  error: null,
};

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {},
});

export default routesSlice.reducer;