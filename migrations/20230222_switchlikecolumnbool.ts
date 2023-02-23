import {DataTypes} from "sequelize"


module.exports = {
    up: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.removeColumn('likes', 'like_or_dislike')

      await queryInterface.addColumn('likes', 'like_or_dislike', {
        field: 'like_or_dislike',
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },)
    },
    down: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.removeColumn('likes', 'like_or_dislike')
    },
  }