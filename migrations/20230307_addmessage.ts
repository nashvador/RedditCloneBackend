import {DataTypes} from "sequelize"


module.exports = {
    up: async ({ context: queryInterface } : {context: any}) => {
        await queryInterface.createTable('messages', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
              },
              createdAt: {
                  field: 'created_at',
                  type: DataTypes.DATE,
              },
              updatedAt: {
                  field: 'updated_at',
                  type: DataTypes.DATE,
              },
              subject: {
                  type: DataTypes.STRING,
                  allowNull: false,
              },
              messageContent: {
                  field: 'message_content',
                  type: DataTypes.TEXT,
                  allowNull: false,
              }
          })
          await queryInterface.addColumn('messages', 'user_from', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
          })
          await queryInterface.addColumn('messages', 'user_to', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
          })
    },
    down: async ({ context: queryInterface } : {context: any}) => {
        await queryInterface.dropTable('messages')
    },
  }