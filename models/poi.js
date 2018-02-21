'use strict';
module.exports = (sequelize, Sequelize) => {
  let Poi = sequelize.define('Poi', {
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      lat: Sequelize.FLOAT,
      lng: Sequelize.FLOAT,
      verified: Sequelize.BOOLEAN,
      like: Sequelize.INTEGER,
      unlike: Sequelize.INTEGER
  }, {});
  Poi.associate = function(models) {
    // associations can be defined here
      Poi.belongsTo(models.User);
  };
  return Poi;
};