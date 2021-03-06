'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscribtion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.SubscribtionOption, {
        foreignKey: 'subscribtionId',
        onDelete: 'CASCADE'
      });
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
  Subscribtion.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      status: DataTypes.STRING,
      beginingDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      cancelDate: DataTypes.DATE,
      userId: DataTypes.UUID,
      contractId: DataTypes.UUID
    },
    {
      sequelize,
      modelName: 'Subscribtion'
    }
  );
  return Subscribtion;
};
