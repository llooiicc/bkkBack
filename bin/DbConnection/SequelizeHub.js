'use strict';
class SequelizeHub {

    constructor() {
        this.Sequelize = require('sequelize');

        this.sequelize = new this.Sequelize('database', null, null, {
            host: 'localhost',
            dialect: 'sqlite',

            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },

            // SQLite only
            storage: 'database.db3'
        });

        this.sequelize.models.Poi = require('../../models/poi')(this.sequelize, this.Sequelize);
        this.sequelize.models.User = require('../../models/user')(this.sequelize, this.Sequelize);
        this.sequelize.models.Favori = require('../../models/favori')(this.sequelize, this.Sequelize);
        this.sequelize.models.UserHasFavori = require('../../models/userhasfavori')(this.sequelize, this.Sequelize);

        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        this.sequelize.models.Favori.associate(this.sequelize.models);
        this.sequelize.models.Poi.associate(this.sequelize.models);

        this.sequelize.models.Poi.sync({force: true});
        this.sequelize.models.User.sync({force: true});
        this.sequelize.models.Favori.sync({force: true});

        this.sequelize.models.UserHasFavori.sync({force: true});

    }


}

module.exports = SequelizeHub;