"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tags",
      [
        {
          tag_name: "apple",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          tag_name: "banana",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          tag_name: "Chinese New Year",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          tag_name: "Singapore",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          tag_name: "Rekt",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          tag_name: "SG Snowing",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          tag_name: "Yishun",
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
    await queryInterface.bulkDelete("Tags", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
