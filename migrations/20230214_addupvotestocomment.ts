import {DataTypes} from "sequelize"


module.exports = {
    up: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.addColumn('comments', 'up_votes', {
        type: DataTypes.INTEGER,
        default: 0
      })
      await queryInterface.removeColumn('comments', 'upVotes')
    },
    down: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.removeColumn('users', 'admin')
      await queryInterface.removeColumn('users', 'disabled')
    },
  }