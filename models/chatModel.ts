import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";

class Chat extends Model {
  public id!: number;
  public userId1!: number;
  public userId2!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Chat.init(
  {
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
        model: "user",
        key: "id",
      },
    },
    userId2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id2",
      references: {
        model: "user",
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
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "chat",
    tableName: "chats",
  }
);

export { Chat };
