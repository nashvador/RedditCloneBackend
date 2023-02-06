import {Model, DataTypes} from "sequelize"
import { sequelize } from "../util/db"

class User extends Model {}

User.init(  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
    },
    postId : {
      type: DataTypes.INTEGER,
      references: {
          model: 'post',
          key: 'id'
      }
  },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "comment",
        key: 'id'
      }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "user",
  })

  export {User}
