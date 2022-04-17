'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubscribtionOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubscribtionOption.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      subscribtionId: DataTypes.UUID,
      contractOptionId: DataTypes.UUID
    },
    {
      sequelize,
      modelName: 'SubscribtionOption'
    }
  );
  return SubscribtionOption;
};
