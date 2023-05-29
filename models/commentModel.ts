import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";

class Comment extends Model {
  postId: number;
  id: number;
  upVotes: number;
  userId: number;
  commentRespondToId: number;
  edited: boolean;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    commentText: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: "comment_text",
    },
    upVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "up_votes",
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
    },
    edited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
    commentRespondToId: {
      type: DataTypes.INTEGER,
      field: "comment_respond_to_id",
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
    modelName: "comment",
  }
);

export { Comment };
