"use strict";

const { Model } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class ProductsInspection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductsInspection.belongsTo(models.products, {
        foreignKey: "product_id",
      });
      ProductsInspection.hasMany(models.history, {
        foreignKey: "product_inspection_id",
      });
    }
  }
  ProductsInspection.init(
    {
      productId: { type: DataTypes.INTEGER, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      imagePath: { type: DataTypes.STRING, allowNull: false },
      userStatus: { type: DataTypes.STRING },
      aiStatus: { type: DataTypes.STRING },
      aiConfidence: DataTypes.INTEGER,
      aiCrackDimensions: {
        type: DataTypes.JSON,
        get() {
          if (this.getDataValue("aiCrackDimensions"))
            return JSON.parse(this.getDataValue("aiCrackDimensions"));
          return null;
        },
        set(value) {
          if (value)
            return this.setDataValue(
              "aiCrackDimensions",
              JSON.stringify(value)
            );
          return null;
        },
      },
      aiGenerated: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
      deletedAt: { type: DataTypes.DATE },
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
        afterCreate: (item) => {
          sequelize.models.history.create({
            productInspectionId: item.id,
            productId: item.productId,
            userStatus: item.userStatus,
            aiStatus: item.aiStatus,
            aiGenerated: item.aiGenerated,
            note: item.note,
          });
        },
        afterUpdate: (item) => {
          sequelize.models.history.create({
            productInspectionId: item.id,
            productId: item.productId,
            userStatus: item.userStatus,
            aiStatus: item.aiStatus,
            aiGenerated: item.aiGenerated,
            note: item.note,
          });
        },
      },
      timestamps: false,
      sequelize,
      underscored: true,
      modelName: "products_inspections",
    }
  );
  return ProductsInspection;
};
