import {Model, DataTypes} from "sequelize"
import { sequelize } from "../util/db"

class Saved extends Model{}

Saved.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
            model: 'comment',
            key: 'id'
        }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "saved",
  })

  export {Saved}