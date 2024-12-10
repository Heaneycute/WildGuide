// Сид для Animals
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Animals', [
      {
        name: 'Кабан',
        description: 'Дикий кабан, обитает в смешанных лесах',
        category: 'mammal',
        huntingSeason: JSON.stringify({
          start: '09-15',
          end: '12-15'
        }),
        lastKnownLocations: JSON.stringify([
          { lat: 53.8380, lng: 23.8125, date: '2024-12-01' }
        ]),
        populationDensity: JSON.stringify({
          count: 45,
          area: 'km2',
          lastUpdated: '2024-12-01'
        }),
        protectionStatus: 'hunting-allowed',
        createdBy: 1,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Лось',
        description: 'Крупный представитель семейства оленевых',
        category: 'mammal',
        huntingSeason: JSON.stringify({
          start: '10-01',
          end: '12-31'
        }),
        lastKnownLocations: JSON.stringify([
          { lat: 59.58, lng: 150.89, date: '2024-12-01' }
        ]),
        populationDensity: JSON.stringify({
          count: 15,
          area: 'km2',
          lastUpdated: '2024-12-01'
        }),
        protectionStatus: 'hunting-allowed',
        createdBy: 1,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Утка-кряква',
        description: 'Водоплавающая птица, обитает около водоемов',
        category: 'bird',
        huntingSeason: JSON.stringify({
          start: '09-01',
          end: '11-30'
        }),
        lastKnownLocations: JSON.stringify([
          { lat: 59.53, lng: 150.84, date: '2024-12-01' }
        ]),
        populationDensity: JSON.stringify({
          count: 120,
          area: 'km2',
          lastUpdated: '2024-12-01'
        }),
        protectionStatus: 'hunting-allowed',
        createdBy: 1,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Медведь бурый',
        description: 'Крупный хищник, обитает в лесах и горах',
        category: 'mammal',
        huntingSeason: JSON.stringify({
          start: '08-01',
          end: '11-30'
        }),
        lastKnownLocations: JSON.stringify([
          { lat: 59.57, lng: 150.88, date: '2024-12-01' }
        ]),
        populationDensity: JSON.stringify({
          count: 5,
          area: 'km2',
          lastUpdated: '2024-12-01'
        }),
        protectionStatus: 'hunting-allowed',
        createdBy: 1,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Рысь',
        description: 'Дикая кошка, обитает в таежных лесах',
        category: 'mammal',
        huntingSeason: JSON.stringify({
          start: '10-15',
          end: '02-28'
        }),
        lastKnownLocations: JSON.stringify([
          { lat: 59.56, lng: 150.87, date: '2024-12-01' }
        ]),
        populationDensity: JSON.stringify({
          count: 3,
          area: 'km2',
          lastUpdated: '2024-12-01'
        }),
        protectionStatus: 'protected',
        createdBy: 1,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Animals', null, {});
  }
};