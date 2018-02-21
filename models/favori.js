'use strict';
module.exports = (sequelize, Sequelize) => {
  let Favori = sequelize.define('Favori', {

  }, {});
  Favori.associate = function(models) {
    // associations can be defined
    Favori.belongsTo(models.User);
    Favori.belongsTo(models.Poi);
  };
  return Favori;
};