'use strict';

class DataInjector{

    constructor(){

        this.fs = require('fs');
        this.SequelizeHub = require('../bin/DbConnection/SequelizeHub');

    }

    init(){

        let usersJson = require('./users-mock');
        console.log(JSON.stringify(usersJson));
    }

}

module.exports = DataInjector;