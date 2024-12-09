// Сид для Routes
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Routes', [
      {
        name: 'Северная тропа',
        description: 'Маршрут вдоль озера через смешанный лес',
        huntingAreaId: 1,
        waypoints: JSON.stringify([
          { lat: 53.8376, lng: 23.8120, name: 'Старт' },
          { lat: 53.8400, lng: 23.8150, name: 'Смотровая площадка' },
          { lat: 53.8420, lng: 23.8170, name: 'Финиш' }
        ]),
        distance: 5.5,
        difficulty: 'medium',
        estimatedTime: 180,
        season: 'fall',
        createdBy: 1,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Восточная тропа',
        description: 'Научно-исследовательский маршрут через природный парк',
        huntingAreaId: 2,
        waypoints: JSON.stringify([
          { lat: 59.60, lng: 150.90, name: 'Исследовательский центр' },
          { lat: 59.61, lng: 150.92, name: 'Экологическая станция' },
          { lat: 59.62, lng: 150.94, name: 'Пункт наблюдения' }
        ]),
        distance: 4.2,
        difficulty: 'easy',
        estimatedTime: 120,
        season: 'summer',
        createdBy: 1,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Таежный маршрут',
        description: 'Охотничий маршрут через густой лес',
        huntingAreaId: 3,
        waypoints: JSON.stringify([
          { lat: 59.58, lng: 150.89, name: 'База' },
          { lat: 59.59, lng: 150.90, name: 'Засидка' },
          { lat: 59.60, lng: 150.91, name: 'Кормушка' }
        ]),
        distance: 3.8,
        difficulty: 'hard',
        estimatedTime: 240,
        season: 'fall',
        createdBy: 2,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Речной путь',
        description: 'Маршрут вдоль реки для наблюдения за водоплавающей дичью',
        huntingAreaId: 4,
        waypoints: JSON.stringify([
          { lat: 59.52, lng: 150.83, name: 'Причал' },
          { lat: 59.53, lng: 150.84, name: 'Смотровая вышка' },
          { lat: 59.54, lng: 150.85, name: 'Утиная заводь' }
        ]),
        distance: 2.5,
        difficulty: 'easy',
        estimatedTime: 90,
        season: 'spring',
        createdBy: 2,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Горная тропа',
        description: 'Высокогорный маршрут для охоты на копытных',
        huntingAreaId: 5,
        waypoints: JSON.stringify([
          { lat: 59.56, lng: 150.87, name: 'Базовый лагерь' },
          { lat: 59.57, lng: 150.88, name: 'Перевал' },
          { lat: 59.58, lng: 150.89, name: 'Вершина' }
        ]),
        distance: 7.2,
        difficulty: 'hard',
        estimatedTime: 360,
        season: 'fall',
        createdBy: 3,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Альпийский маршрут',
        description: 'Маршрут по альпийским лугам',
        huntingAreaId: 5,
        waypoints: JSON.stringify([
          { lat: 59.57, lng: 150.88, name: 'Приют' },
          { lat: 59.58, lng: 150.89, name: 'Альпийский луг' },
          { lat: 59.59, lng: 150.90, name: 'Смотровая площадка' }
        ]),
        distance: 4.8,
        difficulty: 'medium',
        estimatedTime: 240,
        season: 'summer',
        createdBy: 3,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Кольцевой маршрут',
        description: 'Круговой маршрут через все основные биотопы',
        huntingAreaId: 5,
        waypoints: JSON.stringify([
          { lat: 59.56, lng: 150.87, name: 'Начало' },
          { lat: 59.57, lng: 150.88, name: 'Лесной участок' },
          { lat: 59.58, lng: 150.89, name: 'Горный участок' },
          { lat: 59.57, lng: 150.88, name: 'Возвращение' }
        ]),
        distance: 8.5,
        difficulty: 'hard',
        estimatedTime: 420,
        season: 'summer',
        createdBy: 3,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Экологическая тропа',
        description: 'Образовательный маршрут для изучения природы',
        huntingAreaId: 2,
        waypoints: JSON.stringify([
          { lat: 59.60, lng: 150.90, name: 'Экоцентр' },
          { lat: 59.61, lng: 150.91, name: 'Биостанция' },
          { lat: 59.62, lng: 150.92, name: 'Природный музей' }
        ]),
        distance: 3.2,
        difficulty: 'easy',
        estimatedTime: 150,
        season: 'summer',
        createdBy: 1,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Routes', null, {});
  }
};