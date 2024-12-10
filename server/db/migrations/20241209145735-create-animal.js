'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Animals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM('mammal', 'bird', 'fish'),
        allowNull: false,
        comment: 'Категория животного'
      },
      huntingSeason: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      lastKnownLocations: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      populationDensity: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      protectionStatus: {
        type: Sequelize.ENUM('protected', 'endangered', 'hunting-allowed'),
        allowNull: false,
        comment: 'Статус защиты животного'
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Создание индексов
    await queryInterface.addIndex('Animals', ['category']);
    await queryInterface.addIndex('Animals', ['protectionStatus']);
    await queryInterface.addIndex('Animals', ['createdBy']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Animals');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_animals_category;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_animals_protection_status;');
  }
};