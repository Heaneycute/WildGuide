// types/MapPage/HuntingAreaTypes.ts
// Этот файл определяет типы данных для работы с охотничьими зонами

// Основной интерфейс для охотничьей зоны
// Используется при получении данных с сервера через API
export interface HuntingArea {
    id: number;                    // Уникальный идентификатор зоны
    userId: number | null;         // ID владельца зоны (null для публичных зон)
    name: string;                  // Название зоны
    description: string;           // Описание зоны
    coordinates: number[][];       // Массив координат для отрисовки полигона на карте
    createdAt?: Date;             // Дата создания (опционально)
    updatedAt?: Date;             // Дата последнего обновления (опционально)
  }
  
  // Интерфейс для создания новой зоны
  // Используется при отправке POST запроса на /api/hunting-areas
  export interface HuntingAreaCreate {
    name: string;                 // Название новой зоны
    description: string;          // Описание новой зоны
    coordinates: number[][];      // Координаты для новой зоны
  }
  
  // Интерфейс для обновления существующей зоны
  // Используется при отправке PUT/PATCH запросов
  export interface HuntingAreaUpdate {
    name?: string;               // Новое название (опционально)
    description?: string;        // Новое описание (опционально)
    coordinates?: number[][];    // Новые координаты (опционально)
  }
  
  // Интерфейс состояния Redux для охотничьих зон
  // Используется в huntingAreasSlice.ts
  export interface HuntingAreasState {
    areas: HuntingArea[];         // Массив всех загруженных зон
    selectedArea: HuntingArea | null; // Текущая выбранная зона
    loading: boolean;             // Флаг загрузки данных
    error: string | null;         // Текст ошибки, если есть
  }
  
  // Интерфейсы ответов API
  // Используются при типизации ответов от сервера
  
  // Ответ для одной зоны
  export interface HuntingAreaResponse {
    success: boolean;            // Успешность запроса
    data?: HuntingArea;         // Данные зоны (опционально)
    message?: string;           // Сообщение от сервера (опционально)
  }
  
  // Ответ для массива зон
  export interface HuntingAreasResponse {
    success: boolean;           // Успешность запроса
    data?: HuntingArea[];      // Массив зон (опционально)
    message?: string;          // Сообщение от сервера (опционально)
  }