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
    areaSize: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    terrainType: {
      type: DataTypes.ENUM('лесной', 'горный', 'равнинный', 'водно-болотный', 'смешанный', 'тайга'),
      allowNull: false,
    },
    landscape: {
      type: DataTypes.ENUM('лесной', 'полевой', 'водно-болотный', 'смешанный', 'горный'),
      allowNull: false,
    },
    elevation: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    allowedHuntingTypes: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    huntingSeasons: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    restrictions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    infrastructure: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    waterSources: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    requiredPermits: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    adminContacts: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    rules: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    coordinates: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    allowedWeapons: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  }, {
    modelName: 'HuntingArea',
    timestamps: true,
  });

  HuntingArea.associate = (models) => {
    HuntingArea.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    HuntingArea.hasMany(models.HuntingCabin, {
      foreignKey: 'huntingAreaId',
      as: 'cabins'
    });
    HuntingArea.hasMany(models.Route, {
      foreignKey: 'huntingAreaId',
      as: 'routes'
    });
    HuntingArea.belongsToMany(models.Animal, {
      through: 'AreaAnimals',
      foreignKey: 'huntingAreaId',
      as: 'animals'
    });
  };
  
  return HuntingArea;
};