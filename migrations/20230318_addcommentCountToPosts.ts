import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.addColumn("posts", "comment_count", {
      field: "comment_count",
      type: DataTypes.INTEGER,
      defaultValue: 0,
    });
  },
  down: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.removeColumn("comment_count");
  },
};
