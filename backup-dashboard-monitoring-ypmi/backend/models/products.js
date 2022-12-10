"use strict";

const { Model } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.users, { foreignKey: "user_id" });
      Products.hasMany(models.products_inspections, {
        foreignKey: "product_id",
      });
      Products.hasMany(models.history, {
        foreignKey: "product_id",
      });
    }
  }
  Products.init(
    {
      qrCode: { type: DataTypes.STRING, allowNull: false },
      noShot: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
    },
    {
      hooks: {
        beforeCreate: (item, options) => {
          item.createdAt = moment().format();
          item.updatedAt = moment().format();
        },
        beforeUpdate: (item, options) => {
          item.updatedAt = moment().format();
        },
      },
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: "products",
    }
  );
  return Products;
};
