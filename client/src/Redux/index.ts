import { configureStore } from '@reduxjs/toolkit';
import huntingAreasReducer from './Slices/MapPage/huntingAreasSlice';
import routesReducer from './Slices/MapPage/routesSlice';
import animalsReducer from './Slices/MapPage/animalsSlice';
import huntingCabinsReducer from './Slices/MapPage/huntingCabinsSlice';
import favoritesReducer from './Slices/MapPage/favoritesSlice';
import commentsReducer from './Slices/MapPage/commentsSlice';
import layersReducer from './Slices/layersSlice';
import calendarReducer from './Slices/calendarSlice';
import animalExampleReducer from './Slices/animalExampleSlice';

export const store = configureStore({
  reducer: {
    huntingAreas: huntingAreasReducer,
    routes: routesReducer,
    animals: animalsReducer,
    huntingCabins: huntingCabinsReducer,
    favorites: favoritesReducer,
    comments: commentsReducer,
    layers: layersReducer,
    calendar: calendarReducer,
    animalExample: animalExampleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;