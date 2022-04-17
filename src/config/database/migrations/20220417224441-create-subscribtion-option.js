'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SubscribtionOptions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      subscribtionId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Subscribtions',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      contractOptionId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'ContractOptions',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SubscribtionOptions');
  }
};
