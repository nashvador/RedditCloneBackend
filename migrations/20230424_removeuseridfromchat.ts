import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.removeColumn("chats", "user_id1");
    await queryInterface.removeColumn("chats", "user_id2");
  },
  down: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.addColumn("chats", "user_id1", {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id1",
      references: {
        model: "users",
        key: "id",
      },
    });
    await queryInterface.addColumn("chats", "user_id2", {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id2",
      references: {
        model: "users",
        key: "id",
      },
    });
  },
};
