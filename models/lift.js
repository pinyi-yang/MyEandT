'use strict';
module.exports = (sequelize, DataTypes) => {
  const lift = sequelize.define('lift', {
    name: DataTypes.STRING
  }, {});
  lift.associate = function(models) {
    // associations can be defined here
    models.lift.belongsToMany(models.dailytask, {through: 'dailytasksLifts'})
  };
  return lift;
};