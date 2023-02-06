import {Model, DataTypes} from "sequelize"
import { sequelize } from "../util/db"

class Post extends Model {}

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
    },
    upVotes: {
        type: DataTypes.INTEGER
    },
    postContent: {
        type: DataTypes.TEXT
    },
    userId : {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "post",
  })

  export {Post}
