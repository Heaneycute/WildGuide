'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      itemType: {
        type: Sequelize.ENUM('area', 'cabin', 'route', 'animal', 'weapon'),
        allowNull: false,
        comment: 'Тип избранного элемента'
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dateAdded: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      weaponType: {
        type: Sequelize.ENUM('rifle', 'shotgun', 'bow'),
        allowNull: true,
        comment: 'Тип оружия (если применимо)'
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
    await queryInterface.addIndex('Favorites', ['userId']);
    await queryInterface.addIndex('Favorites', ['itemType']);
    await queryInterface.addIndex('Favorites', ['itemId']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorites');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_favorites_item_type;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_favorites_weapon_type;');
  }
};