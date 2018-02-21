'use strict';
module.exports = (sequelize, Sequelize) => {
  let UserHasFavori = sequelize.define('UserHasFavori', {

  }, {});
  UserHasFavori.associate = function(models) {
    // associations can be defined here
      UserHasFavori.belongsTo(models.User);
      UserHasFavori.belongsTo(models.Favori);
  };

  return UserHasFavori;
};