"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Weapon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Weapon.init(
    {
      model: DataTypes.STRING,
      description: DataTypes.STRING,
      law: DataTypes.STRING,
      model_link: DataTypes.STRING,
      img_link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Weapon",
    }
  );
  return Weapon;
};
