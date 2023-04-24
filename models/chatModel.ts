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
