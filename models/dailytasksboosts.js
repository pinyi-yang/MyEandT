'use strict';
module.exports = (sequelize, DataTypes) => {
  const dailytasksBoosts = sequelize.define('dailytasksBoosts', {
    dailytaskId: DataTypes.INTEGER,
    boostId: DataTypes.INTEGER
  }, {});
  dailytasksBoosts.associate = function(models) {
    // associations can be defined here
  };
  return dailytasksBoosts;
};