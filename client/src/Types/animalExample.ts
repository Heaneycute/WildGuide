
export interface HuntingSeason {
    start: string;
    end: string;
  }
  
  export interface Location {
    region: string;
  }
  
  export interface AnimalExample {
    id: number;
    name: string;
    species: string;
    description: string;
    location: Location;
    huntingSeason: HuntingSeason;
    isFavorite: boolean;
    views: number;
  }
  
  export interface AnimalExampleFilters {
    species: string | null;
    favorite: boolean;
    season: boolean;
  }
  
  export interface ValidationErrors {
    name?: string;
    description?: string;
  }
  
  export interface AnimalExampleState {
    animals: AnimalExample[];
    filters: AnimalExampleFilters;
    loading: boolean;
    error: string | null;
  }