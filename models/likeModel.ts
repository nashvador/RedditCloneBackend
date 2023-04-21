import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";

class Like extends Model {
  likeOrDislike: boolean;
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    likeOrDislike: {
      field: "like_or_dislike",
      type: DataTypes.BOOLEAN,
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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "comment",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "like",
  }
);

export { Like };
