'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.SubscribtionOption, {
        foreignKey: 'contractOptionId',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Contract, {
        foreignKey: 'contractId',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Option, {
        foreignKey: 'optionId',
        onDelete: 'CASCADE'
      });
    }
  }
  ContractOption.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      contractId: DataTypes.UUID,
      optionId: DataTypes.UUID
    },
    {
      sequelize,
      modelName: 'ContractOption'
    }
  );
  return ContractOption;
};
