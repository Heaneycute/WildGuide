'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HuntingArea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HuntingArea.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    coordinates: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'HuntingArea',
    underscored: true,
  });
  return HuntingArea;
};