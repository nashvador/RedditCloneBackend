import {DataTypes} from "sequelize"


module.exports = {
    up: async ({ context: queryInterface } : {context: any}) => {
        await queryInterface.createTable('saved', {
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
          await queryInterface.addColumn('saved', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
          })
          await queryInterface.addColumn('saved', 'comment_id', {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'comments', key: 'id' },
          })
          await queryInterface.addColumn('saved', 'post_id', {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'posts', key: 'id' },
          })
    },
    down: async ({ context: queryInterface } : {context: any}) => {
        await queryInterface.dropTable('saved')
    },
  }