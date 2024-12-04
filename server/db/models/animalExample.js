'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnimalExample extends Model {
    static associate() {}
  }
  AnimalExample.init(
    {
      name: DataTypes.STRING,
      species: DataTypes.STRING,
      description: DataTypes.TEXT,
      isFavorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      location: DataTypes.JSON,
      huntingSeason: DataTypes.JSON,
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'AnimalExample',
    }
  );
  return AnimalExample;
};