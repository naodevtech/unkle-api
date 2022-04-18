'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserContract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Contract, {
        foreignKey: 'contractId',
        onDelete: 'CASCADE'
      });
    }
  }
  UserContract.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: DataTypes.UUID,
      contractId: DataTypes.UUID
    },
    {
      sequelize,
      modelName: 'UserContract'
    }
  );
  return UserContract;
};
