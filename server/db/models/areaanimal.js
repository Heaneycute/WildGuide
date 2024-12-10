'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AreaAnimal extends Model {
    static associate(models) {
      // Определение связей между моделями
      AreaAnimal.belongsTo(models.HuntingArea, {
        foreignKey: 'huntingAreaId',
        as: 'huntingArea'
      });
      AreaAnimal.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal'
      });
    }
  }
  AreaAnimal.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Animals',
        key: 'id'
      }
    },
    areaType: {
      type: DataTypes.ENUM('habitat', 'migration', 'breeding'),
      allowNull: false,
      comment: 'Тип территории для животного'
    },
    populationCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Примерная численность популяции'
    },
    lastSeen: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Дата последнего наблюдения'
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
    modelName: 'AreaAnimal',
  });
  return AreaAnimal;
};