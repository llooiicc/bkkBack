'use strict';

class FavoriDir {

    constructor(favori){

        this.Favori = favori;
        this.rejection = {
            'message': '',
            'errorCode': '',
            'source': ''
        };
    }

    createFavori(datas){

        let userId = datas.userId;
        let poiId = datas.poiId;

        return new Promise((resolve, reject) => {

            if(userId && poiId){

                this.Favori.create({
                    UserId: userId,
                    PoiId: poiId
                }).then((result) => {
                    if(result){
                        resolve(result);
                    }
                    else{
                        reject("hiogig");
                    }
                }).catch((err) => {
                    reject(err);

                });

            }
            else{

                this.rejection['message'] = 'userId or poiId undefined';
                reject(this.rejection);
            }
        });
    }

}

module.exports = FavoriDir;