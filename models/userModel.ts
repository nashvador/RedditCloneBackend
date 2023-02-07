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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
  },
  updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,},

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

  User.prototype.toJSON =  function () {
    let values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }

  export {User}
