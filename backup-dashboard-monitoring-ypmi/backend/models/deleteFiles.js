"use strict";

const { Model } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class deleteFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      deleteFiles.belongsTo(models.users, { foreignKey: "user_id" });
    }
  }
  deleteFiles.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
      isDelete: { type: DataTypes.BOOLEAN, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
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
      modelName: "delete_files",
    }
  );
  return deleteFiles;
};
