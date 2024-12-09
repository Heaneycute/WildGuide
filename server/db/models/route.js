'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {
      Route.belongsTo(models.HuntingArea, {
        foreignKey: 'huntingAreaId',
        as: 'huntingArea'
      });
      Route.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });
    }
  }
  Route.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    huntingAreaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HuntingAreas',
        key: 'id'
      }
    },
    waypoints: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    distance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false,
      comment: 'Сложность маршрута'
    },
    estimatedTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Расчетное время в минутах'
    },
    season: {
      type: DataTypes.ENUM('spring', 'summer', 'fall', 'winter'),
      allowNull: false,
      comment: 'Сезон использования маршрута'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};