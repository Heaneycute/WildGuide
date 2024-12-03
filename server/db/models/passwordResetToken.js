'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordResetToken extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  PasswordResetToken.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PasswordResetToken',
    tableName: 'PasswordResetTokens'
  });
  return PasswordResetToken;
};