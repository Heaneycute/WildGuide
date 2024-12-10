'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AreaAnimals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      huntingAreaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HuntingAreas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      animalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Animals',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      areaType: {
        type: Sequelize.ENUM('habitat', 'migration', 'breeding'),
        allowNull: false,
        comment: 'Тип территории для животного'
      },
      populationCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Примерная численность популяции'
      },
      lastSeen: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Дата последнего наблюдения'
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
    await queryInterface.addIndex('AreaAnimals', ['huntingAreaId']);
    await queryInterface.addIndex('AreaAnimals', ['animalId']);
    await queryInterface.addIndex('AreaAnimals', ['areaType']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AreaAnimals');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_area_animals_area_type;');
  }
};