"use strict";
const moment = require("moment");
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          first_name: "admin",
          last_name: null,
          password: bcrypt.hashSync("admin", 8),
          last_login: null,
          is_admin: true,
          is_staff: true,
          is_active: true,
          email: "admin@admin.com",
          created_at: moment().format(),
          updated_at: moment().format(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
