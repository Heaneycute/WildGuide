'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HuntingCabin extends Model {
    static associate(models) {
      HuntingCabin.belongsTo(models.HuntingArea, {
        foreignKey: 'huntingAreaId',
        as: 'huntingArea'
      });
    }
  }
  HuntingCabin.init({
    name: {
      type: DataTypes.STRING,
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
    coordinates: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buildingType: {
      type: DataTypes.ENUM('permanent', 'temporary'),
      allowNull: false,
      comment: 'Тип постройки: permanent - постоянная, temporary - временная'
    },
    usageSeason: {
      type: DataTypes.ENUM('spring', 'summer', 'fall', 'зима', 'all-year','spring-fall','summer-fall'),
      allowNull: false
    },
    hasElectricity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    heatingType: {
      type: DataTypes.ENUM('none', 'wood', 'electric', 'gas', 'solar'),
      allowNull: false,
      defaultValue: 'none'
    },
    kitchenFacilities: {
      type: DataTypes.ENUM('none', 'basic', 'full', 'minimal'),
      allowNull: false,
      defaultValue: 'none'
    },
    bathroomType: {
      type: DataTypes.ENUM('none', 'outdoor', 'indoor'),
      allowNull: false,
      defaultValue: 'none'
    },
    bookingRules: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    transportAccess: {
      type: DataTypes.ENUM('car', 'atv', 'foot', 'boat','helicopter'),
      allowNull: false
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
    modelName: 'HuntingCabin',
  });
  return HuntingCabin;
};