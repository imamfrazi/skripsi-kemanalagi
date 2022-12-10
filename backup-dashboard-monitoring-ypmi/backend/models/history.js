"use strict";

const { Model } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.products, {
        foreignKey: "product_id",
      });
      History.belongsTo(models.products_inspections, {
        foreignKey: "product_inspection_id",
      });
    }
  }
  History.init(
    {
      productInspectionId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      userStatus: { type: DataTypes.STRING },
      aiStatus: { type: DataTypes.STRING },
      aiGenerated: { type: DataTypes.BOOLEAN, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
      note: { type: DataTypes.STRING },
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
      timestamps: true,
      underscored: true,
      modelName: "history",
    }
  );
  return History;
};
