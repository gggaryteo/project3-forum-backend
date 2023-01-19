"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          slug: "apple",
          title: "Short post about apples",
          description: "Journey to learn about apples",
          content:
            "Apples can be sorted into types by sweetness, peel color, date discovered, ripening season, geographical origin, and/or how best to use them. There are red apples and green apples, sweet apples and tart apples, dry apples and juicy apples, apples best eaten fresh off the tree, and types of apples that are best baked into a yummy dessert. There are ancient heirloom varieties and brand-new modern introductions. There are hundreds of different kinds of apples!",
          user_id: "1",
          likes_counter: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: "banana",
          title: "Best quotes about banana",
          description: "Quote about bananas",
          content: `“Goals are like bananas, they come in bunches.” ~ Brendan Morrison
“Life is full of banana skins. You slip, you carry on.” ~ Daphne Guinness
“Time flies like an arrow; fruit flies like a banana” ~ Groucho Marx
“My mother always used to say: ‘The older you get, the better you get, unless you’re a banana.'” ~ Betty White`,
          user_id: "2",
          likes_counter: 0,
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
    await queryInterface.bulkDelete("Posts", null, {});
    /**
     *
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
