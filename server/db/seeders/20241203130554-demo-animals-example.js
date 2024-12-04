"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("AnimalExamples", [
      {
        name: "Лось",
        species: "Копытные",
        description:
          "Крупное парнокопытное животное, обитает в лесах. Период охоты: сентябрь-январь.",
        isFavorite: false,
        location: JSON.stringify({
          latitude: 56.8498,
          longitude: 60.6521,
          region: "Свердловская область",
        }),
        huntingSeason: JSON.stringify({
          start: "2024-09-01",
          end: "2025-01-31",
          restrictions: ["Запрещена охота на самок с детенышами"],
        }),
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Кабан",
        species: "Копытные",
        description:
          "Всеядное млекопитающее, активен в сумерках. Период охоты: июнь-февраль.",
        isFavorite: false,
        location: JSON.stringify({
          latitude: 55.7558,
          longitude: 37.6173,
          region: "Московская область",
        }),
        huntingSeason: JSON.stringify({
          start: "2024-06-01",
          end: "2025-02-28",
          restrictions: ["Необходима специальная лицензия"],
        }),
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Глухарь",
        species: "Боровая дичь",
        description:
          "Крупная лесная птица, активна на рассвете. Период охоты: март-май.",
        isFavorite: false,
        location: JSON.stringify({
          latitude: 59.9343,
          longitude: 30.3351,
          region: "Ленинградская область",
        }),
        huntingSeason: JSON.stringify({
          start: "2024-03-01",
          end: "2024-05-31",
          restrictions: ["Только в утренние часы"],
        }),
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Заяц-русак",
        species: "Пушные звери",
        description:
          "Быстрый и осторожный зверь, активен ночью. Период охоты: октябрь-январь.",
        isFavorite: false,
        location: JSON.stringify({
          latitude: 54.7431,
          longitude: 55.9678,
          region: "Башкортостан",
        }),
        huntingSeason: JSON.stringify({
          start: "2024-10-01",
          end: "2025-01-31",
          restrictions: ["Запрещена охота без собаки"],
        }),
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("AnimalExamples", null, {});
  },
};
