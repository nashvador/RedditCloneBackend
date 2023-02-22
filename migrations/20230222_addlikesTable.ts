import {DataTypes} from "sequelize"


module.exports = {
    up: async ({ context: queryInterface } : {context: any}) => {
        await queryInterface.createTable('likes', {
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
            likeOrDislike: {
                field: 'like_or_dislike',
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isZeroOrOne(value: number){
                        if (value < -1 || value > 1){
                            throw new Error('Values are not')
                        }
                    }
                }
            }
          })
          await queryInterface.addColumn('likes', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
          })
          await queryInterface.addColumn('likes', 'comment_id', {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'comments', key: 'id' },
          })
          await queryInterface.addColumn('likes', 'post_id', {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'posts', key: 'id' },
          })
    },
    down: async ({ context: queryInterface } : {context: any}) => {
        await queryInterface.dropTable('likes')
    },
  }