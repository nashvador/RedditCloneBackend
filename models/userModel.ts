import { LargeNumberLike } from "crypto";
import {Model, DataTypes} from "sequelize"
import { sequelize } from "../util/db"

class User extends Model {
  password: string;
  username: string;
  name: string
  id: number;
  disabled: boolean;
  admin: boolean;
  tag: string;
}

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
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
  updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },

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
