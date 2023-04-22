import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.createTable("messages", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "sender_id",
        references: {
          model: "users",
          key: "id",
        },
      },
      recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "recipient_id",
        references: {
          model: "users",
          key: "id",
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
      },
    });
    await queryInterface.createTable("chats", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id1",
        references: {
          model: "users",
          key: "id",
        },
      },
      userId2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id2",
        references: {
          model: "users",
          key: "id",
        },
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
      },
    });
    await queryInterface.createTable("user_chats", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "chat_id",
        references: {
          model: "chats",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.dropTable("messages");
    await queryInterface.dropTable("chats");
    await queryInterface.dropTable("user_chats");
  },
};
