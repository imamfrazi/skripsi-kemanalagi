"use strict";

const { Model } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class TimeConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TimeConfig.belongsTo(models.users, { foreignKey: "user_id" });
    }
  }
  TimeConfig.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      delayTime: DataTypes.INTEGER,
      allowanceTime: DataTypes.INTEGER,
      outputRedirectTime: DataTypes.INTEGER,
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
      timestamps: false,
      sequelize,
      underscored: true,
      modelName: "time_config",
    }
  );
  return TimeConfig;
};
