export interface FavoriteItem {
    id: number;
    userId: number;
    itemType: 'area' | 'route' | 'cabin' | 'animal' | 'weapon';  // изменено с type на itemType
    itemId: number;
    dateAdded: string;
    notes?: string;
    weaponType?: 'rifle' | 'shotgun' | 'bow';
}