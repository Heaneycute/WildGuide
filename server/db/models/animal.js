'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static associate(models) {
      Animal.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });
      Animal.belongsToMany(models.HuntingArea, {
        through: 'AreaAnimals',
        foreignKey: 'animalId',
        as: 'huntingAreas'
      });
    }
  }
  Animal.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('mammal', 'bird', 'fish'),
      allowNull: false,
      comment: 'Категория животного'
    },
    huntingSeason: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    lastKnownLocations: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    populationDensity: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    protectionStatus: {
      type: DataTypes.ENUM('protected', 'endangered', 'hunting-allowed'),
      allowNull: false,
      comment: 'Статус защиты животного'
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
    modelName: 'Animal',
  });
  return Animal;
};