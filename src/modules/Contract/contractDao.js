'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.UserContract, {
        foreignKey: 'contractId',
        onDelete: 'CASCADE'
      });
      this.hasMany(models.ContractOption, {
        foreignKey: 'contractId',
        onDelete: 'CASCADE'
      });
      this.hasMany(models.Subscribtion, {
        foreignKey: 'contractId',
        onDelete: 'CASCADE'
      });
    }
  }
  Contract.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      icon: DataTypes.STRING,
      reference: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Contract'
    }
  );
  return Contract;
};
