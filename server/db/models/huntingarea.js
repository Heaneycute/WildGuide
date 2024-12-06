module.exports = (sequelize, DataTypes) => {
  const HuntingArea = sequelize.define('HuntingArea', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    coordinates: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  }, {
    modelName: 'HuntingArea',
    timestamps: true
  });

  HuntingArea.associate = (models) => {
    HuntingArea.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  
  return HuntingArea;
};