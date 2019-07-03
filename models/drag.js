'use strict';
module.exports = (sequelize, DataTypes) => {
  const drag = sequelize.define('drag', {
    name: DataTypes.STRING
  }, {});
  drag.associate = function(models) {
    // associations can be defined here
    models.drag.belongsToMany(models.dailtask, { through: dailtasksdrags })
  };
  return drag;
};