// Сид для AreaAnimals
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('AreaAnimals', [
      {
        huntingAreaId: 1,
        animalId: 1,
        areaType: 'habitat',
        populationCount: 15,
        lastSeen: new Date('2024-12-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        huntingAreaId: 2,
        animalId: 2,
        areaType: 'migration',
        populationCount: 8,
        lastSeen: new Date('2024-12-05'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        huntingAreaId: 4,
        animalId: 3,
        areaType: 'breeding',
        populationCount: 45,
        lastSeen: new Date('2024-12-08'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        huntingAreaId: 5,
        animalId: 4,
        areaType: 'habitat',
        populationCount: 3,
        lastSeen: new Date('2024-12-07'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        huntingAreaId: 3,
        animalId: 5,
        areaType: 'migration',
        populationCount: 2,
        lastSeen: new Date('2024-12-03'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AreaAnimals', null, {});
  }
};