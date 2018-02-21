'use strict';

class Auth {

    constructor() {

        this.SequelizeHub = require('../DbConnection/SequelizeHub');
        this.UserDir = require('../Dirs/UserDir');
        this.md5 = require('md5');

        this.sequelizeHub = new this.SequelizeHub();

        this.userDir = new this.UserDir(this.sequelizeHub.sequelize.models.User);

    }

    login(datas){

        datas.password = this.md5(datas.password);

        return this.userDir.readUserByLoginAndPassword(datas)
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
                return err;
            });

    }

}

module.exports = Auth;