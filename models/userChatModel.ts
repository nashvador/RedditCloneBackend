import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";

export class UserChat extends Model {
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
