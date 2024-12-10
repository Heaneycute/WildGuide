'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Routes', {
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
      waypoints: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      distance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      difficulty: {
        type: Sequelize.ENUM('easy', 'medium', 'hard'),
        allowNull: false,
        comment: 'Сложность маршрута'
      },
      estimatedTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Расчетное время в минутах'
      },
      season: {
        type: Sequelize.ENUM('spring', 'summer', 'fall', 'winter'),
        allowNull: false,
        comment: 'Сезон использования маршрута'
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
    await queryInterface.addIndex('Routes', ['huntingAreaId']);
    await queryInterface.addIndex('Routes', ['createdBy']);
    await queryInterface.addIndex('Routes', ['difficulty']);
    await queryInterface.addIndex('Routes', ['season']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Routes');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_routes_difficulty;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_routes_season;');
  }
};