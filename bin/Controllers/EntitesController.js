'use strict';

class EntitesController {

    constructor(){

        this.SequelizeHub = require('../DbConnection/SequelizeHub');
        this.PoiDir = require('../Dirs/PoiDir');
        this.UserDir = require('../Dirs/UserDir');
        this.FavoriDir = require('../Dirs/FavoriDir');

        this.sequelizeHub = new this.SequelizeHub();

        this.poiDir = new this.PoiDir(this.sequelizeHub.sequelize.models.Poi);
        this.userDir = new this.UserDir(this.sequelizeHub.sequelize.models.User);
        this.favoriDir = new this.FavoriDir(this.sequelizeHub.sequelize.models.Favori);

    }

    addUser(userDatas) {

        return this.userDir.createUser(userDatas)
            .then((result) => {
                let userInfos = {
                    id: result.id,
                    lastConnection: result.lastconnection
                };
                return userInfos;
            }).catch((err) => {
                console.log(err);
                if(err['message']){
                    return err;
                }
            })
    }

    addPoi(datas){

        return this.poiDir.readPoiByTitleAndContent(datas).then((result) => {

            if(result == null){

                Promise.all([this.poiDir.createPoi(datas)])
                    .then((result) => {
                        if(result) {
                            return '{ok}';
                        }
                        else {
                            return '{ko}';
                        }
                    }).catch((err) => {
                    console.log(err);
                })
            }

        });

    }

    addFavori(datas){

        if(datas.userId && datas.poiId){
            return this.favoriDir.createFavori({
                userId: datas.userId,
                poiId : datas.poiId
            })
                .then((result) => {
                    return result
                }).catch((err) => {
                    return err;
                })
        }
        else{
            return {'message' : 'no favori created'};
        }
    }

    readPoi(poiId){

        return this.poiDir.readPoiById(poiId)
            .then((content) => {
                return content;
            })
    }

    readAllPoi(){
        return this.poiDir.readAllPoi()
            .then((content) => {
                return content;
            })
    }


    voteForPoi(poiId, value){

        return this.poiDir.vote(poiId, value)
            .then((result) => {
                return result
            });
    }


}

module.exports = EntitesController;