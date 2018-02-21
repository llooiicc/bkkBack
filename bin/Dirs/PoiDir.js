'use strict';

class PoiDir {

    constructor(poi){

        this.Poi = poi;

    }

    createPoi(poiJsonValue) {

        return new Promise((resolve, reject) => {
            this.Poi.create(({
                title: poiJsonValue.title,
                description: poiJsonValue.description,
                lat: poiJsonValue.lat,
                lng: poiJsonValue.lng,
                like: 0,
                unlike: 0,
                verified: false
            })).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    readPoiById(id){

        return new Promise((resolve, reject) => {
            this.Poi.find({
                where: {
                    id: id
                }
            }).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    readPoiByTitleAndContent(datas){
        let title = datas.title;
        let description = datas.description;

        return new Promise((resolve, reject) => {
            this.Poi.find({
                where: {
                    title: title,
                    description: description
                }
            }).then((result) => {
                console.log('[dir] ' + result);
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        });

    }

    readAllPoi(){

        return new Promise((resolve, reject) => {
            this.Poi.findAll()
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    updatePoi(poi){


    }

    vote(poiId, value){ // (value) : 0 = unlike , 1 = like
        return new Promise((resolve, reject) => {

            this.readPoiById(poiId).then((poi) => {
                if(poi){
                    console.log('[poiDir] readByID in vote : ' + poi);
                    let like = poi.like;
                    let unlike = poi.unlike;

                    if(value == 0){
                        unlike++;
                    }
                    else{
                        like++;
                    }

                    poi.updateAttributes({
                        like: like,
                        unlike: unlike
                    }).then((result) => {
                        console.log(result);
                        resolve(result);
                    }).catch((err) => {
                        reject(err);
                    })
                }
            }).catch((err) => {

            });
        });



    }

}

module.exports = PoiDir;