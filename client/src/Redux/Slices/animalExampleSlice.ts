import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  latitude: number;
  longitude: number;
  region: string;
}

interface HuntingSeason {
  start: string;
  end: string;
  restrictions?: string[];
}

interface AnimalExample {
  id: number;
  name: string;
  species: string;
  description: string;
  isFavorite: boolean;
  location: Location;
  huntingSeason: HuntingSeason;
  views: number;
}

interface Filters {
  species: string | null;
  favorite: boolean;
  season: boolean;
}

interface ExampleState {
  animals: AnimalExample[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  selectedAnimal: AnimalExample | null;
}

const initialState: ExampleState = {
  animals: [],
  loading: false,
  error: null,
  filters: {
    species: null,
    favorite: false,
    season: false
  },
  selectedAnimal: null
};

const animalExampleSlice = createSlice({
  name: 'animalExample',
  initialState,
  reducers: {
    setAnimals: (state, action: PayloadAction<AnimalExample[]>) => {
      state.animals = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const animal = state.animals.find(a => a.id === action.payload);
      if (animal) {
        animal.isFavorite = !animal.isFavorite;
      }
    },
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    incrementViews: (state, action: PayloadAction<number>) => {
      const animal = state.animals.find(a => a.id === action.payload);
      if (animal) {
        animal.views += 1;
      }
    },
    setSelectedAnimal: (state, action: PayloadAction<AnimalExample | null>) => {
      state.selectedAnimal = action.payload;
    }
  },
});

export const {
  setAnimals,
  setLoading,
  setError,
  toggleFavorite,
  setFilters,
  incrementViews,
  setSelectedAnimal
} = animalExampleSlice.actions;
export default animalExampleSlice.reducer;