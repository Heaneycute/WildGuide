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
      description: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'AnimalExample',
    }
  );
  return AnimalExample;
};