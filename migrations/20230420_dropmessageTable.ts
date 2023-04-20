module.exports = {
  up: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.dropTable("messages");
  },
  down: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.dropTable("messages");
  },
};
