'use strict';
module.exports = (sequelize, DataTypes) => {
  const dailytasksLifts = sequelize.define('dailytasksLifts', {
    dailytaskId: DataTypes.INTEGER,
    liftId: DataTypes.INTEGER
  }, {});
  dailytasksLifts.associate = function(models) {
    // associations can be defined here
  };
  return dailytasksLifts;
};