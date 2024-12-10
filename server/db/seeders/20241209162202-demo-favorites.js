// Сид для Favorites
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Favorites', [
      {
        userId: 1,
        itemType: 'area',
        itemId: 1,
        dateAdded: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        itemType: 'cabin',
        itemId: 3,
        dateAdded: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        itemType: 'route',
        itemId: 5,
        dateAdded: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        itemType: 'animal',
        itemId: 3,
        dateAdded: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        itemType: 'route',
        itemId: 4,
        dateAdded: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Favorites', null, {});
  }
};