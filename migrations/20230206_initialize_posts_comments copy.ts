import {DataTypes} from "sequelize"

module.exports = {
    up: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.createTable('posts', {
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
      
      })
      await queryInterface.createTable('users', {
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
          created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            
           },
           updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
           },
      
      })
      await queryInterface.createTable('comments', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        commentText: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          field: 'comment_text'
        },
        upVotes: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,},
      
      
      })
      await queryInterface.addColumn('posts', 'user_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
      })
      await queryInterface.addColumn('posts', 'comment_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'comments', key: 'id' },
      })
      await queryInterface.addColumn('users', 'comment_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'comments', key: 'id' },
      })
      await queryInterface.addColumn('users', 'post_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'posts', key: 'id' },
      })
      await queryInterface.addColumn('comments', 'user_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
      })
      await queryInterface.addColumn('comments', 'post_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'posts', key: 'id' },
      })
    },
    down: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.dropTable('posts')
      await queryInterface.dropTable('users')
      await queryInterface.dropTable('comments')

    },
  }