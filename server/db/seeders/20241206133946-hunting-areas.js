// seeders/20241206133946-hunting-areas.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Системные зоны (без userId)
    const systemAreas = [
      {
        name: 'Заповедник "Северная тайга"',
        description: 'Охраняемая природная территория. Охота запрещена.',
        coordinates: JSON.stringify([
          [59.55, 150.82],
          [59.57, 150.84],
          [59.58, 150.86],
          [59.57, 150.88],
          [59.56, 150.87],
          [59.55, 150.82]
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Природный парк "Восточный"',
        description: 'Природоохранная зона с ограниченным доступом.',
        coordinates: JSON.stringify([
          [59.60, 150.90],
          [59.61, 150.92],
          [59.62, 150.94],
          [59.61, 150.95],
          [59.60, 150.93],
          [59.60, 150.90]
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Пользовательские зоны (с userId)
    const userAreas = [
      {
        userId: 2,
        name: 'Охотничий участок "Таежный"',
        description: 'Личный участок для охоты на копытных.',
        coordinates: JSON.stringify([
          [59.58, 150.89],
          [59.59, 150.90],
          [59.60, 150.91],
          [59.59, 150.92],
          [59.58, 150.91],
          [59.58, 150.89]
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        name: 'Речная долина',
        description: 'Участок для охоты на водоплавающую дичь.',
        coordinates: JSON.stringify([
          [59.52, 150.83],
          [59.53, 150.84],
          [59.54, 150.85],
          [59.53, 150.86],
          [59.52, 150.85],
          [59.52, 150.83]
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        name: 'Горный массив',
        description: 'Участок для охоты на марала и кабаргу.',
        coordinates: JSON.stringify([
          [59.56, 150.87],
          [59.57, 150.88],
          [59.58, 150.89],
          [59.57, 150.90],
          [59.56, 150.89],
          [59.56, 150.87]
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Сначала вставляем системные зоны
    await queryInterface.bulkInsert('huntingAreas', systemAreas);
    
    // Затем пробуем вставить пользовательские зоны
    try {
      await queryInterface.bulkInsert('huntingAreas', userAreas);
    } catch (error) {
      console.log('Пользовательские зоны не были добавлены: отсутствует пользователь');
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('huntingAreas', null, {});
  }
};