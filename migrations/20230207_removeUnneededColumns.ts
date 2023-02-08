
module.exports = {
    up: async ({ context: queryInterface } : {context: any}) => {

      await queryInterface.removeColumn('posts', 'comment_id')
      await queryInterface.removeColumn('users', 'comment_id')
      await queryInterface.removeColumn('users', 'post_id')
    },
    down: async ({ context: queryInterface } : {context: any}) => {
      await queryInterface.dropTable('posts')
      await queryInterface.dropTable('users')
      await queryInterface.dropTable('comments')
    },
  }