import { configureStore } from '@reduxjs/toolkit';
import animalExampleReducer from './Slices/animalExampleSlice';
import calendarReducer from './Slices/calendarSlice';

export const store = configureStore({
  reducer: {
    animalExample: animalExampleReducer,
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;