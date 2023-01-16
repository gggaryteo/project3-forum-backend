"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "Apple@gmail.com",
          username: "Apple",
          biography: "I like apples",
          profileimg: null,
          password: "Apples123",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "Banana@gmail.com",
          username: "Banana",
          biography: "I like banana",
          profileimg: null,
          password: "Banana123",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "Cherry@gmail.com",
          username: "Cherry",
          biography: "I like cherries",
          profileimg: null,
          password: "Cherry123",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     *
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
