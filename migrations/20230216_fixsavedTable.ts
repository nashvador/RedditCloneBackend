import {DataTypes} from "sequelize"


module.exports = {
    up: async ({ context: queryInterface } : {context: any}) => {
        await queryInterface.dropTable('saved')
        await queryInterface.createTable('saveds', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
              },
              createdAt: {
                field: 'created_at',
                type: DataTypes.DATE,
              },
          })
          await queryInterface.addColumn('saveds', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
          })
          await queryInterface.addColumn('saveds', 'comment_id', {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'comments', key: 'id' },
          })
          await queryInterface.addColumn('saveds', 'post_id', {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'posts', key: 'id' },
          })
    },
    down: async ({ context: queryInterface } : {context: any}) => {
        await queryInterface.dropTable('saveds')
    },
  }