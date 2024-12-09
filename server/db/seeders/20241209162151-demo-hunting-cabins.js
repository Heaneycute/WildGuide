// Сид для охотничьих домиков
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('HuntingCabins', [
      // Заповедник "Северная тайга" (id: 1)
      {
        name: 'Научная станция',
        huntingAreaId: 1,
        coordinates: JSON.stringify({
          lat: 59.56,
          lng: 150.83
        }),
        capacity: 12,
        buildingType: 'permanent',
        usageSeason: 'all-year',
        hasElectricity: true,
        heatingType: 'electric',
        kitchenFacilities: 'full',
        bathroomType: 'indoor',
        bookingRules: 'Только для научных сотрудников',
        price: 0.00,
        transportAccess: 'car',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Пост охраны',
        huntingAreaId: 1,
        coordinates: JSON.stringify({
          lat: 59.57,
          lng: 150.85
        }),
        capacity: 4,
        buildingType: 'permanent',
        usageSeason: 'all-year',
        hasElectricity: true,
        heatingType: 'electric',
        kitchenFacilities: 'basic',
        bathroomType: 'indoor',
        bookingRules: 'Только для сотрудников охраны',
        price: 0.00,
        transportAccess: 'car',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Природный парк "Восточный" (id: 2)
      {
        name: 'Исследовательский центр',
        huntingAreaId: 2,
        coordinates: JSON.stringify({
          lat: 59.61,
          lng: 150.92
        }),
        capacity: 15,
        buildingType: 'permanent',
        usageSeason: 'all-year',
        hasElectricity: true,
        heatingType: 'electric',
        kitchenFacilities: 'full',
        bathroomType: 'indoor',
        bookingRules: 'По согласованию с администрацией парка',
        price: 0.00,
        transportAccess: 'car',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Экологический пост',
        huntingAreaId: 2,
        coordinates: JSON.stringify({
          lat: 59.60,
          lng: 150.93
        }),
        capacity: 6,
        buildingType: 'permanent',
        usageSeason: 'all-year',
        hasElectricity: true,
        heatingType: 'electric',
        kitchenFacilities: 'basic',
        bathroomType: 'outdoor',
        bookingRules: 'Для сотрудников экологического надзора',
        price: 0.00,
        transportAccess: 'car',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Охотничий участок "Таежный" (id: 3)
      {
        name: 'Охотничья база',
        huntingAreaId: 3,
        coordinates: JSON.stringify({
          lat: 59.59,
          lng: 150.90
        }),
        capacity: 8,
        buildingType: 'permanent',
        usageSeason: 'all-year',
        hasElectricity: true,
        heatingType: 'wood',
        kitchenFacilities: 'full',
        bathroomType: 'indoor',
        bookingRules: 'Бронирование за неделю, только для охотников с лицензией',
        price: 2500.00,
        transportAccess: 'car',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Лесной кордон',
        huntingAreaId: 3,
        coordinates: JSON.stringify({
          lat: 59.58,
          lng: 150.91
        }),
        capacity: 4,
        buildingType: 'permanent',
        usageSeason: 'all-year',
        hasElectricity: false,
        heatingType: 'wood',
        kitchenFacilities: 'basic',
        bathroomType: 'outdoor',
        bookingRules: 'Только для охотников с лицензией',
        price: 1500.00,
        transportAccess: 'atv',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Таежная заимка',
        huntingAreaId: 3,
        coordinates: JSON.stringify({
          lat: 59.60,
          lng: 150.91
        }),
        capacity: 3,
        buildingType: 'temporary',
        usageSeason: 'fall',
        hasElectricity: false,
        heatingType: 'wood',
        kitchenFacilities: 'basic',
        bathroomType: 'none',
        bookingRules: 'Свободный доступ для охотников участка',
        price: 500.00,
        transportAccess: 'foot',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Речная долина (id: 4)
      {
        name: 'Речная база',
        huntingAreaId: 4,
        coordinates: JSON.stringify({
          lat: 59.53,
          lng: 150.84
        }),
        capacity: 10,
        buildingType: 'permanent',
        usageSeason: 'spring-fall',
        hasElectricity: true,
        heatingType: 'electric',
        kitchenFacilities: 'full',
        bathroomType: 'indoor',
        bookingRules: 'Бронирование за 3 дня',
        price: 2000.00,
        transportAccess: 'car',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Прибрежный домик',
        huntingAreaId: 4,
        coordinates: JSON.stringify({
          lat: 59.52,
          lng: 150.85
        }),
        capacity: 4,
        buildingType: 'permanent',
        usageSeason: 'spring-fall',
        hasElectricity: false,
        heatingType: 'wood',
        kitchenFacilities: 'basic',
        bathroomType: 'outdoor',
        bookingRules: 'Свободное заселение',
        price: 1000.00,
        transportAccess: 'boat',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Горная хижина',
        huntingAreaId: 5,
        coordinates: JSON.stringify({
        lat: 59.57,
        lng: 150.88
        }),
        capacity: 6,
        buildingType: 'permanent',
        usageSeason: 'all-year',
        hasElectricity: false,
        heatingType: 'wood',
        kitchenFacilities: 'basic',
        bathroomType: 'outdoor',
        bookingRules: 'Предварительное бронирование',
        price: 1800.00,
        transportAccess: 'foot',
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: 'Альпийский приют',
        huntingAreaId: 5,
        coordinates: JSON.stringify({
        lat: 59.58,
        lng: 150.89
        }),
        capacity: 8,
        buildingType: 'permanent',
        usageSeason: 'summer-fall',
        hasElectricity: true,
        heatingType: 'solar',
        kitchenFacilities: 'full',
        bathroomType: 'indoor',
        bookingRules: 'Только для членов клуба',
        price: 2500.00,
        transportAccess: 'helicopter',
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: 'Таежная изба',
        huntingAreaId: 5,
        coordinates: JSON.stringify({
        lat: 59.56,
        lng: 150.87
        }),
        capacity: 4,
        buildingType: 'temporary',
        usageSeason: 'fall',
        hasElectricity: false,
        heatingType: 'wood',
        kitchenFacilities: 'basic',
        bathroomType: 'none',
        bookingRules: 'Свободный доступ',
        price: 800.00,
        transportAccess: 'atv',
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: 'Высокогорный пост',
        huntingAreaId: 5,
        coordinates: JSON.stringify({
        lat: 59.57,
        lng: 150.89
        }),
        capacity: 3,
        buildingType: 'permanent',
        usageSeason: 'all-year',
        hasElectricity: true,
        heatingType: 'gas',
        kitchenFacilities: 'basic',
        bathroomType: 'outdoor',
        bookingRules: 'Только для сотрудников',
        price: 0.00,
        transportAccess: 'helicopter',
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: 'Охотничья сторожка',
        huntingAreaId: 5,
        coordinates: JSON.stringify({
        lat: 59.56,
        lng: 150.88
        }),
        capacity: 2,
        buildingType: 'temporary',
        usageSeason: 'fall',
        hasElectricity: false,
        heatingType: 'wood',
        kitchenFacilities: 'minimal',
        bathroomType: 'none',
        bookingRules: 'По разрешению администрации',
        price: 500.00,
        transportAccess: 'foot',
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: 'Горный кордон',
        huntingAreaId: 5,
        coordinates: JSON.stringify({
        lat: 59.58,
        lng: 150.90
        }),
        capacity: 5,
        buildingType: 'permanent',
        usageSeason: 'spring-fall',
        hasElectricity: true,
        heatingType: 'electric',
        kitchenFacilities: 'full',
        bathroomType: 'indoor',
        bookingRules: 'Бронирование за неделю',
        price: 1500.00,
        transportAccess: 'car',
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: 'Лесной приют',
        huntingAreaId: 5,
        coordinates: JSON.stringify({
        lat: 59.57,
        lng: 150.91
        }),
        capacity: 4,
        buildingType: 'permanent',
        usageSeason: 'all-year',
        hasElectricity: true,
        heatingType: 'wood',
        kitchenFacilities: 'basic',
        bathroomType: 'outdoor',
        bookingRules: 'Свободное заселение',
        price: 1200.00,
        transportAccess: 'atv',
        createdAt: new Date(),
        updatedAt: new Date()
        }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('HuntingCabins', null, {});
  }
};