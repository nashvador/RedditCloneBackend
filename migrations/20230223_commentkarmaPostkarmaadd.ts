import {DataTypes} from "sequelize"


module.exports = {
    up: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.addColumn('users', 'comment_karma', {
        field: 'comment_karma',
        defaultValue: 0,
        type: DataTypes.INTEGER
    },
    ),
    await queryInterface.addColumn('users', 'post_karma', {
        field: 'post_karma',
        defaultValue: 0,
        type: DataTypes.INTEGER
    },)
    },
    down: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.removeColumn('users', 'comment_karma')
      await queryInterface.removeColumn('users', 'post_karma')

    },
  }