"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products_inspections", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image_path: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_status: {
        type: Sequelize.STRING,
      },
      ai_status: {
        type: Sequelize.STRING,
      },
      ai_confidence: {
        type: Sequelize.INTEGER,
      },
      ai_crack_dimensions: {
        type: Sequelize.JSON,
      },
      ai_generated: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products_inspections");
  },
};
