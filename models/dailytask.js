'use strict';
module.exports = (sequelize, DataTypes) => {
  const dailytask = sequelize.define('dailytask', {
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Task summary is required.'}
      }
    },
    description: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    type: DataTypes.STRING,
    start: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {msg: 'A start time is required.'}
      }
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {msg: 'An end time is required.'}
      }
    },
    efficiency: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(pendingtask, options) {
        pendingtask.type = pendingtask.type.toLowerCase();
      }
    }
  });
  dailytask.associate = function(models) {
    // associations can be defined here
    models.dailytask.belongsTo(models.user);
    models.dailytask.belongsToMany(models.drag, {through: 'dailytasksDrags'});
    models.dailytask.belongsToMany(models.boost, {through: 'dailytasksBoosts'});
    models.dailytask.belongsToMany(models.lift, {through: 'dailytasksLifts'});
  };
  return dailytask;
};