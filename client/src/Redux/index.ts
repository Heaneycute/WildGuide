import { configureStore } from '@reduxjs/toolkit';
import animalExampleReducer from './Slices/animalExampleSlice';

export const store = configureStore({
  reducer: {
    animalExample: animalExampleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;