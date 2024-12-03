'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('AnimalExamples', [
      {
        name: 'Лось',
        species: 'Копытные',
        description: 'Крупное парнокопытное животное, обитает в лесах. Период охоты: сентябрь-январь.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Кабан',
        species: 'Копытные',
        description: 'Всеядное млекопитающее, активен в сумерках. Период охоты: июнь-февраль.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Глухарь',
        species: 'Боровая дичь',
        description: 'Крупная лесная птица, активна на рассвете. Период охоты: март-май.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Заяц-русак',
        species: 'Пушные звери',
        description: 'Быстрый и осторожный зверь, активен ночью. Период охоты: октябрь-январь.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('AnimalExamples', null, {});
  }
};