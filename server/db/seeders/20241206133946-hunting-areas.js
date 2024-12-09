// seeders/20241206133946-hunting-areas.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Системные зоны (без userId)
    const systemAreas = [
      {
        name: 'Заповедник "Северная тайга"',
        description: 'Охраняемая природная территория. Охота запрещена.',
        areaSize: 1200.50,
        terrainType: 'taiga',
        landscape: 'forest',
        elevation: 450,
        allowedHuntingTypes: JSON.stringify(['none']),
        huntingSeasons: JSON.stringify({}),
        restrictions: 'Полный запрет охоты. Ограниченный доступ. Научные исследования только по разрешению.',
        infrastructure: JSON.stringify({
          towers: 2,
          roads: 1,
          facilities: ['Научная станция', 'Пост охраны']
        }),
        waterSources: JSON.stringify({
          rivers: ['Река Северная'],
          lakes: ['Озеро Таежное']
        }),
        requiredPermits: 'Специальное разрешение администрации. Научная аккредитация.',
        adminContacts: JSON.stringify({
          office: '+7 413 XXX XX XX',
          email: 'reserve@magadan.ru'
        }),
        coordinates: JSON.stringify([
          [59.55, 150.82],
          [59.57, 150.84],
          [59.58, 150.86],
          [59.57, 150.88],
          [59.56, 150.87],
          [59.55, 150.82]
        ]),
        rules: 'Запрещено: охота, рыбалка, сбор растений. Разрешено: научные исследования по согласованию.',
        allowedWeapons: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Природный парк "Восточный"',
        description: 'Природоохранная зона с ограниченным доступом.',
        areaSize: 850.75,
        terrainType: 'mixed',
        landscape: 'mixed',
        elevation: 320,
        allowedHuntingTypes: JSON.stringify(['none']),
        huntingSeasons: JSON.stringify({
          research: { start: '07-01', end: '08-31' }
        }),
        restrictions: 'Строго ограниченный доступ. Только научная деятельность.',
        infrastructure: JSON.stringify({
          towers: 2,
          roads: 2,
          facilities: ['Исследовательский центр', 'Экологическая тропа']
        }),
        waterSources: JSON.stringify({
          rivers: ['Река Восточная'],
          springs: ['Родник Чистый']
        }),
        requiredPermits: 'Пропуск администрации парка. Экологическое разрешение.',
        adminContacts: JSON.stringify({
          office: '+7 413 XXX XX XX',
          email: 'east.park@magadan.ru'
        }),
        coordinates: JSON.stringify([
          [59.60, 150.90],
          [59.61, 150.92],
          [59.62, 150.94],
          [59.61, 150.95],
          [59.60, 150.93],
          [59.60, 150.90]
        ]),
        rules: 'Запрещено: охота, рыбалка без разрешения. Разрешено: научные исследования, экскурсии.',
        allowedWeapons: JSON.stringify([]),
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
        areaSize: 450.25,
        terrainType: 'forest',
        landscape: 'forest',
        elevation: 380,
        allowedHuntingTypes: JSON.stringify(['big_game', 'fur_animals']),
        huntingSeasons: JSON.stringify({
          fall: { start: '09-01', end: '11-30' }
        }),
        restrictions: 'Охота только по лицензии. Запрет весенней охоты.',
        infrastructure: JSON.stringify({
          towers: 3,
          roads: 1,
          facilities: ['Охотничья база', 'Склад']
        }),
        waterSources: JSON.stringify({
          rivers: ['Ручей Таежный'],
          springs: ['Родник Охотничий']
        }),
        requiredPermits: 'Охотничий билет. Разрешение на оружие.',
        adminContacts: JSON.stringify({
          phone: '+7 914 XXX XX XX'
        }),
        coordinates: JSON.stringify([
          [59.58, 150.89],
          [59.59, 150.90],
          [59.60, 150.91],
          [59.59, 150.92],
          [59.58, 150.91],
          [59.58, 150.89]
        ]),
        rules: 'Разрешена охота на копытных и пушных зверей в сезон. Обязательно наличие лицензии.',
        allowedWeapons: JSON.stringify(['rifle', 'shotgun']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        name: 'Речная долина',
        description: 'Участок для охоты на водоплавающую дичь.',
        areaSize: 320.80,
        terrainType: 'wetland',
        landscape: 'wetland',
        elevation: 150,
        allowedHuntingTypes: JSON.stringify(['waterfowl', 'small_game']),
        huntingSeasons: JSON.stringify({
          spring: { start: '05-01', end: '05-31' },
          fall: { start: '09-01', end: '10-31' }
        }),
        restrictions: 'Запрет охоты в период гнездования. Ограничение использования плавсредств.',
        infrastructure: JSON.stringify({
          towers: 2,
          facilities: ['Причал', 'Наблюдательный пункт']
        }),
        waterSources: JSON.stringify({
          rivers: ['Река Долинная'],
          lakes: ['Озеро Утиное']
        }),
        requiredPermits: 'Охотничий билет. Разрешение на водоплавающую дичь.',
        adminContacts: JSON.stringify({
          phone: '+7 914 XXX XX XX'
        }),
        coordinates: JSON.stringify([
          [59.52, 150.83],
          [59.53, 150.84],
          [59.54, 150.85],
          [59.53, 150.86],
          [59.52, 150.85],
          [59.52, 150.83]
        ]),
        rules: 'Разрешена охота на водоплавающую дичь в сезон. Запрещено использование моторных лодок.',
        allowedWeapons: JSON.stringify(['shotgun']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        name: 'Горный массив',
        description: 'Участок для охоты на марала и кабаргу.',
        areaSize: 680.40,
        terrainType: 'mountain',
        landscape: 'mountainous',
        elevation: 1200,
        allowedHuntingTypes: JSON.stringify(['big_game']),
        huntingSeasons: JSON.stringify({
          fall: { start: '08-01', end: '11-30' }
        }),
        restrictions: 'Только для опытных охотников. Ограничение на количество добычи.',
        infrastructure: JSON.stringify({
          towers: 7,
          facilities: ['Горный приют', 'Смотровая площадка']
        }),
        waterSources: JSON.stringify({
          springs: ['Горный ручей'],
          lakes: ['Высокогорное озеро']
        }),
        requiredPermits: 'Охотничий билет. Специальное разрешение на копытных.',
        adminContacts: JSON.stringify({
          phone: '+7 914 XXX XX XX'
        }),
        coordinates: JSON.stringify([
          [59.56, 150.87],
          [59.57, 150.88],
          [59.58, 150.89],
          [59.57, 150.90],
          [59.56, 150.89],
          [59.56, 150.87]
        ]),
        rules: 'Разрешена охота на копытных в сезон. Обязательно наличие опыта горной охоты.',
        allowedWeapons: JSON.stringify(['rifle']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Сначала вставляем системные зоны
    await queryInterface.bulkInsert('HuntingAreas', systemAreas);
    
    // Затем пробуем вставить пользовательские зоны
    try {
      await queryInterface.bulkInsert('HuntingAreas', userAreas);
    } catch (error) {
      console.log('Пользовательские зоны не были добавлены: отсутствует пользователь');
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HuntingAreas', null, {});
  }
};