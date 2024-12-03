import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnimalExample {
  id: number;
  name: string;
  species: string;
  description: string;
}

interface ExampleState {
  animals: AnimalExample[];
  loading: boolean;
  error: string | null;
}

const initialState: ExampleState = {
  animals: [],
  loading: false,
  error: null,
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
  },
});

export const { setAnimals, setLoading, setError } = animalExampleSlice.actions;
export default animalExampleSlice.reducer;