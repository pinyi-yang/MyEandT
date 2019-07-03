'use strict';
module.exports = (sequelize, DataTypes) => {
  const boost = sequelize.define('boost', {
    name: DataTypes.STRING
  }, {});
  boost.associate = function(models) {
    // associations can be defined here
    models.boost.belongsToMany(models.dailytask, { through: 'dailytasksBoosts'});
  };
  return boost;
};