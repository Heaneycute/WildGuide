import { configureStore } from '@reduxjs/toolkit';
import huntingAreasReducer from './Slices/MapPage/huntingAreasSlice';
import animalExampleReducer from './Slices/animalExampleSlice';
import layersReducer from './Slices/layersSlice';
import calendarReducer from './Slices/calendarSlice';

export const store = configureStore({
  reducer: {
    huntingAreas: huntingAreasReducer,
    animalExample: animalExampleReducer,
    layers: layersReducer,
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;