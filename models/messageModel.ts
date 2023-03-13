import {Model, DataTypes} from "sequelize"
import { sequelize } from "../util/db"

class Message extends Model {
}

Message.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userFrom: {
        field: 'user_from',
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
          },
        allowNull: false,
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    },
    userTo : {
        field: 'user_to',
        type: DataTypes.INTEGER,
        references: {
        model: 'user',
        key: 'id'
        },
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    messageContent: {
        field: 'message_content',
        type: DataTypes.TEXT,
        allowNull: false,
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "message",
  })

  export {Message}
