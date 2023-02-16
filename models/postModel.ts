import {Model, DataTypes} from "sequelize"
import { sequelize } from "../util/db"

class Post extends Model {
  id: number;
  postTitle: string;
  upVotes: number;
  postContent: string;
  userId: number;
}

Post.init(  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postTitle: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: 'post_title',

    },
    upVotes: {
        type: DataTypes.INTEGER,
        field: 'up_votes'
    },
    postContent: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'post_content'
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
  },
  updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
    
    userId : {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "post",
  })

  export {Post}
