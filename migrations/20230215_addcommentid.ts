import {DataTypes} from "sequelize"


module.exports = {
    up: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.addColumn('comments', 'comment_respond_to_id',{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'comments', key: 'id' },
      })
    },
    down: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.removeColumn('comments', 'comment_respond_to_id')
    },
  }