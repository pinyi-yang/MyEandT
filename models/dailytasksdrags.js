'use strict';
module.exports = (sequelize, DataTypes) => {
  const dailytasksDrags = sequelize.define('dailytasksDrags', {
    dailytaskId: DataTypes.INTEGER,
    dragId: DataTypes.INTEGER
  }, {});
  dailytasksDrags.associate = function(models) {
    // associations can be defined here
  };
  return dailytasksDrags;
};