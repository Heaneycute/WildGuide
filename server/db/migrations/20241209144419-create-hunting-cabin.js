'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HuntingCabins', {
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
      coordinates: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      buildingType: {
        type: Sequelize.ENUM('permanent', 'temporary'),
        allowNull: false,
        comment: 'Тип постройки: permanent - постоянная, temporary - временная'
      },
      usageSeason: {
        type: Sequelize.ENUM('spring', 'summer', 'fall', 'зима', 'all-year','spring-fall','summer-fall'),
        allowNull: false
      },
      hasElectricity: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      heatingType: {
        type: Sequelize.ENUM('none', 'wood', 'electric', 'gas', 'solar'),
        allowNull: false,
        defaultValue: 'none'
      },
      kitchenFacilities: {
        type: Sequelize.ENUM('none', 'basic', 'full', 'minimal'),
        allowNull: false,
        defaultValue: 'none'
      },
      bathroomType: {
        type: Sequelize.ENUM('none', 'outdoor', 'indoor'),
        allowNull: false,
        defaultValue: 'none'
      },
      bookingRules: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      transportAccess: {
        type: Sequelize.ENUM('car', 'atv', 'foot', 'boat', 'helicopter'),
        allowNull: false
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
    await queryInterface.addIndex('HuntingCabins', ['huntingAreaId']);
    await queryInterface.addIndex('HuntingCabins', ['buildingType']);
    await queryInterface.addIndex('HuntingCabins', ['usageSeason']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HuntingCabins');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_hunting_cabins_building_type;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_hunting_cabins_usage_season;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_hunting_cabins_heating_type;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_hunting_cabins_kitchen_facilities;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_hunting_cabins_bathroom_type;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_hunting_cabins_transport_access;');
  }
};