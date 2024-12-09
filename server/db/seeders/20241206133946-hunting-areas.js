// seeders/20241206133946-hunting-areas.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Системные зоны (без userId)
    const systemAreas = [
      {
        name: 'Заповедник "Северная тайга"',
        description: 'Охраняемая природная территория. Охота строго запрещена.',
        areaSize: 1200.50,
        terrainType: 'тайга',
        landscape: 'лесной',
        elevation: 450,
        allowedHuntingTypes: JSON.stringify(['запрещена']),
        huntingSeasons: JSON.stringify({}),
        restrictions: 'Полный запрет охоты. Ограниченный доступ. Научные исследования проводятся только по специальному разрешению.',
        infrastructure: JSON.stringify({
          вышки: 2,
          дороги: 1,
          сооружения: ['Научная станция', 'Пост охраны']
        }),
        waterSources: JSON.stringify({
          реки: ['Река Северная'],
          озера: ['Озеро Таёжное']
        }),
        requiredPermits: 'Специальное разрешение администрации заповедника. Научная аккредитация.',
        adminContacts: JSON.stringify({
          телефон: '+7 413 XXX XX XX',
          почта: 'reserve@magadan.ru'
        }),
        coordinates: JSON.stringify([
          [59.55, 150.82],
          [59.57, 150.84],
          [59.58, 150.86],
          [59.57, 150.88],
          [59.56, 150.87],
          [59.55, 150.82]
        ]),
        rules: 'Категорически запрещено: охота, рыбалка, сбор растений. Разрешено: научные исследования по согласованию с администрацией.',
        allowedWeapons: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Природный парк "Восточный"',
        description: 'Природоохранная зона с ограниченным доступом посетителей.',
        areaSize: 850.75,
        terrainType: 'смешанный',
        landscape: 'смешанный',
        elevation: 320,
        allowedHuntingTypes: JSON.stringify(['запрещена']),
        huntingSeasons: JSON.stringify({
          исследования: { начало: '01.07', конец: '31.08' }
        }),
        restrictions: 'Строго ограниченный доступ. Разрешена только научно-исследовательская деятельность.',
        infrastructure: JSON.stringify({
          вышки: 2,
          дороги: 2,
          сооружения: ['Исследовательский центр', 'Экологическая тропа']
        }),
        waterSources: JSON.stringify({
          реки: ['Река Восточная'],
          родники: ['Родник Чистый']
        }),
        requiredPermits: 'Пропуск администрации парка. Экологическое разрешение.',
        adminContacts: JSON.stringify({
          телефон: '+7 413 XXX XX XX',
          почта: 'vostok.park@magadan.ru'
        }),
        coordinates: JSON.stringify([
          [59.60, 150.90],
          [59.61, 150.92],
          [59.62, 150.94],
          [59.61, 150.95],
          [59.60, 150.93],
          [59.60, 150.90]
        ]),
        rules: 'Запрещено: охота, рыбалка без специального разрешения. Разрешено: научные исследования, экологические экскурсии.',
        allowedWeapons: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Пользовательские зоны (с userId)
    const userAreas = [
      {
        userId: 2,
        name: 'Охотничий участок "Таёжный"',
        description: 'Частный охотничий участок для охоты на копытных животных.',
        areaSize: 450.25,
        terrainType: 'лесной',
        landscape: 'лесной',
        elevation: 380,
        allowedHuntingTypes: JSON.stringify(['крупная дичь', 'пушной зверь']),
        huntingSeasons: JSON.stringify({
          осень: { начало: '01.09', конец: '30.11' }
        }),
        restrictions: 'Охота разрешена только при наличии лицензии. Весенняя охота запрещена.',
        infrastructure: JSON.stringify({
          вышки: 3,
          дороги: 1,
          сооружения: ['Охотничья база', 'Склад снаряжения']
        }),
        waterSources: JSON.stringify({
          реки: ['Ручей Таёжный'],
          родники: ['Родник Охотничий']
        }),
        requiredPermits: 'Действующий охотничий билет. Разрешение на оружие.',
        adminContacts: JSON.stringify({
          телефон: '+7 914 XXX XX XX'
        }),
        coordinates: JSON.stringify([
          [59.58, 150.89],
          [59.59, 150.90],
          [59.60, 150.91],
          [59.59, 150.92],
          [59.58, 150.91],
          [59.58, 150.89]
        ]),
        rules: 'Разрешена охота на копытных и пушных зверей в установленный сезон. Обязательно наличие действующей лицензии.',
        allowedWeapons: JSON.stringify(['нарезное', 'гладкоствольное']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        name: 'Речная долина',
        description: 'Охотничий участок для охоты на водоплавающую дичь.',
        areaSize: 320.80,
        terrainType: 'водно-болотный',
        landscape: 'водно-болотный',
        elevation: 150,
        allowedHuntingTypes: JSON.stringify(['водоплавающая дичь', 'мелкая дичь']),
        huntingSeasons: JSON.stringify({
          весна: { начало: '01.05', конец: '31.05' },
          осень: { начало: '01.09', конец: '31.10' }
        }),
        restrictions: 'Запрет охоты в период гнездования птиц. Ограничения на использование плавательных средств.',
        infrastructure: JSON.stringify({
          вышки: 2,
          сооружения: ['Причал', 'Наблюдательный пункт']
        }),
        waterSources: JSON.stringify({
          реки: ['Река Долинная'],
          озера: ['Озеро Утиное']
        }),
        requiredPermits: 'Охотничий билет. Разрешение на добычу водоплавающей дичи.',
        adminContacts: JSON.stringify({
          телефон: '+7 914 XXX XX XX'
        }),
        coordinates: JSON.stringify([
          [59.52, 150.83],
          [59.53, 150.84],
          [59.54, 150.85],
          [59.53, 150.86],
          [59.52, 150.85],
          [59.52, 150.83]
        ]),
        rules: 'Разрешена охота на водоплавающую дичь в установленный сезон. Запрещено использование моторных лодок.',
        allowedWeapons: JSON.stringify(['гладкоствольное']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        name: 'Горный массив',
        description: 'Охотничий участок для охоты на марала и кабаргу в горной местности.',
        areaSize: 680.40,
        terrainType: 'горный',
        landscape: 'горный',
        elevation: 1200,
        allowedHuntingTypes: JSON.stringify(['крупная дичь']),
        huntingSeasons: JSON.stringify({
          осень: { начало: '01.08', конец: '30.11' }
        }),
        restrictions: 'Доступ только для опытных охотников. Строгие ограничения по количеству добычи.',
        infrastructure: JSON.stringify({
          вышки: 7,
          сооружения: ['Горный приют', 'Смотровая площадка']
        }),
        waterSources: JSON.stringify({
          родники: ['Горный ручей'],
          озера: ['Высокогорное озеро']
        }),
        requiredPermits: 'Охотничий билет. Специальное разрешение на добычу копытных.',
        adminContacts: JSON.stringify({
          телефон: '+7 914 XXX XX XX'
        }),
        coordinates: JSON.stringify([
          [59.56, 150.87],
          [59.57, 150.88],
          [59.58, 150.89],
          [59.57, 150.90],
          [59.56, 150.89],
          [59.56, 150.87]
        ]),
        rules: 'Разрешена охота на копытных в установленный сезон. Обязательно наличие опыта горной охоты.',
        allowedWeapons: JSON.stringify(['нарезное']),
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