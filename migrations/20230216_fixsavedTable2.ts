import {DataTypes} from "sequelize"


module.exports = {
    up: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.addColumn('saveds', 'updated_at', {
        type: DataTypes.DATE,
      })
    },
    down: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.removeColumn('saveds', 'updated_at')
    },
  }