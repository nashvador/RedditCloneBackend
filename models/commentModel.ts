import {Model, DataTypes} from "sequelize"
import { sequelize } from "../util/db"

class Comment extends Model {}

Comment.init(  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    commentText: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    upVotes: {
        type: DataTypes.INTEGER
    },
    userId : {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    postId : {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id'
        }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "comment",
  })

  export {Comment}
