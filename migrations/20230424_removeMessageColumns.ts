import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.addColumn("messages", "chat_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "chat_id",
      references: {
        model: "chats",
        key: "id",
      },
    });
    await queryInterface.removeColumn("messages", "recipient_id");
  },
  down: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.removeColumn("messages", "chat_id");
    await queryInterface.addColumn("messages", "recipient_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "recipient_id",
      references: {
        model: "users",
        key: "id",
      },
    });
  },
};
