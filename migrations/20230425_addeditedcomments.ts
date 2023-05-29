import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.addColumn("comments", "edited", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
  },
  down: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.removeColumn("comments", "edited");
  },
};
