// Миграция для создания таблицы Comments
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Comments', {
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
          onDelete: 'CASCADE'
        },
        itemType: {
          type: Sequelize.ENUM('route', 'area', 'cabin'),
          allowNull: false
        },
        itemId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        rating: {
          type: Sequelize.INTEGER,
          allowNull: true,
          validate: {
            min: 1,
            max: 5
          }
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
  
      await queryInterface.addIndex('Comments', ['userId']);
      await queryInterface.addIndex('Comments', ['itemType', 'itemId']);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Comments');
    }
  };