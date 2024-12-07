import { configureStore } from '@reduxjs/toolkit';
import huntingAreasReducer from './Slices/MapPage/huntingAreasSlice';
import animalExampleReducer from './Slices/animalExampleSlice';
import layersReducer from './Slices/layersSlice';

export const store = configureStore({
  reducer: {
    huntingAreas: huntingAreasReducer,
    animalExample: animalExampleReducer,
    layers: layersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;