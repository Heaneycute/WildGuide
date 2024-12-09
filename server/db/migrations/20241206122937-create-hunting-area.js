module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HuntingAreas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      areaSize: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      terrainType: {
        type: Sequelize.ENUM('forest', 'mountain', 'plain', 'wetland', 'mixed', 'taiga'),
        allowNull: false
      },
      landscape: {
        type: Sequelize.ENUM('forest', 'field', 'wetland', 'mixed', 'mountainous'),
        allowNull: false
      },
      elevation: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      allowedHuntingTypes: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      huntingSeasons: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      restrictions: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      infrastructure: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      waterSources: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      requiredPermits: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      adminContacts: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      rules: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      coordinates: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      allowedWeapons: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Создание индексов
    await queryInterface.addIndex('HuntingAreas', ['userId']);
    await queryInterface.addIndex('HuntingAreas', ['name']);
    await queryInterface.addIndex('HuntingAreas', ['terrainType']);
    await queryInterface.addIndex('HuntingAreas', ['landscape']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HuntingAreas');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_hunting_areas_terrain_type;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_hunting_areas_landscape;');
  }
};