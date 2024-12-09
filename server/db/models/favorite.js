'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  Favorite.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    itemType: {
      type: DataTypes.ENUM('area', 'cabin', 'route', 'animal', 'weapon'),
      allowNull: false,
      comment: 'Тип избранного элемента'
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    weaponType: {
      type: DataTypes.ENUM('rifle', 'shotgun', 'bow'),
      allowNull: true,
      comment: 'Тип оружия (если применимо)'
    },
    createdAt: {
    allowNull: false,
    type: DataTypes.DATE
    },
      updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};