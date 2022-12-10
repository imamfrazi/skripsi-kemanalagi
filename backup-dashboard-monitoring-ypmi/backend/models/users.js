"use strict";

const { Model } = require("sequelize");
const moment = require("moment");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.products, { foreignKey: "user_id" });
      Users.hasOne(models.time_config, { foreignKey: "user_id" });
      Users.hasOne(models.delete_files, { foreignKey: "user_id" });
    }
  }
  Users.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          return this.setDataValue("password", bcrypt.hashSync(value, 8));
        },
      },
      lastLogin: DataTypes.DATE,
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
      isStaff: { type: DataTypes.BOOLEAN, defaultValue: true },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      email: { type: DataTypes.STRING },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
      deletedAt: { type: DataTypes.DATE },
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
      paranoid: true,
      timestamps: true,
      underscored: true,
      modelName: "users",
    }
  );
  return Users;
};
