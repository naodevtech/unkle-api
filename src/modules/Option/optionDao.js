'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ContractOption, {
        foreignKey: 'optionId',
        onDelete: 'CASCADE'
      });
    }
  }
  Option.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Option'
    }
  );
  return Option;
};
