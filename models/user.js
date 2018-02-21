'use strict';
module.exports = (sequelize, Sequelize) => {
  let User = sequelize.define('User', {
      login: Sequelize.STRING,
      password: Sequelize.STRING,
      pseudo: Sequelize.STRING,
      lastconnection: Sequelize.DATE
  }, {});
  User.associate = function(models) {
    // associations can be defined here

  };
  return User;
};