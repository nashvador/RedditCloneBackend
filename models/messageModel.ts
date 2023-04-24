import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";
import { AllowNull } from "sequelize-typescript";

class Message extends Model {
  public id!: number;
  public senderId!: number;
  public content!: string;
  public chatId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "message",
    tableName: "messages",
  }
);

export { Message };
