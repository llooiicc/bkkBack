'use strict';

class UserDir {

    constructor(User) {

        this.User = User;
        this.md5 = require('md5');
        this.rejection = {
            'message': '',
            'errorCode': '',
            'source': ''
        };
    }

    createUser(userDatas){

        console.log('[UserDir] User value : ' + this.User);//return 'class extends models'

        return new Promise((resolve, reject) => {
            let md5Password = this.md5(userDatas.password);

            this.readUserByPseudo(userDatas.pseudo).then((result) => {

                if(!result){

                    this.readUserByLogin(userDatas.login).then((result) => {

                        if(!result){

                            this.User.create({
                                login: userDatas.login,
                                password: md5Password,
                                pseudo: userDatas.pseudo,
                                lastconnection: Date.now()
                            }).then((result) => {
                                resolve(result);
                            }).catch((err) => {
                                reject(err);
                            });
                        }
                        else{

                            this.rejection['errorCode'] = 1.1;
                            this.rejection['message'] = 'mail already used';
                            this.rejection['source'] = 'UserDir';

                            console.log(this.rejection);
                            reject(this.rejection);
                        }
                    });



                }else{
                    this.rejection['errorCode'] = 1;
                    this.rejection['message'] = 'pseudo already used';
                    this.rejection['source'] = 'UserDir';

                    console.log(this.rejection);
                    reject(this.rejection);
                }

            });

        })
    }

    readUserByPseudo(pseudo){
        return new Promise((resolve, reject) => {
            this.User.find({
                where: {
                    pseudo: pseudo
                }
            }).then((result) => {
                console.log('[User] readByPseudo ' + result);
                resolve(result);
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        });
    }

    readUserByLogin(login){
        return new Promise((resolve, reject) => {
            this.User.find({
                where: {
                    login: login
                }
            }).then((result) => {
                console.log('[User] readByPseudo ' + result);
                resolve(result);
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        });
    }

    readUserByLoginAndPassword(values){

        console.log('[UserDir] User value : ' + this.User);// return 'undefined'

        return new Promise((resolve, reject) => {
            this.User.find({
                where: {
                    login: values.login,
                    password: values.password
                }
            }).then((content) => {
                content.password = null;
                console.log(content);
                resolve(content);
            }).catch((err) => {
                reject (err);
            })
        })
    }





}


module.exports = UserDir;