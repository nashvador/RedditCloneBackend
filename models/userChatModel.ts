import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";

export class UserChat extends Model {
  public id!: number;
  public chatId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserChat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: "user",
        key: "id",
      },
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "chat_id",
      references: {
        model: "chat",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "userchat",
    tableName: "user_chats",
  }
);

export default UserChat;
