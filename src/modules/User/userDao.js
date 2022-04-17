'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.UserContract, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      this.hasMany(models.Subscribtion, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      role: DataTypes.STRING,
      avatar: DataTypes.STRING,
      lastname: DataTypes.STRING,
      firstname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
