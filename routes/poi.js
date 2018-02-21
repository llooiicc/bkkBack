let express = require('express');
let router = express.Router();
let EntitiesController = require('../bin/Controllers/EntitesController');
let entitiesCtrl = new EntitiesController();

/* GET users listing. */
router.put('/', function(req, res, next) {
        let result = entitiesCtrl.addPoi(req.body);
        console.log(result);
        res.send('');
})
    .put('/vote/:id/:value', (req, res) => {
        let id = req.params.id;
        let value = req.params.value;
        console.log('[route] /put/' + id + '/' + value);
        entitiesCtrl.voteForPoi(id, value).then((result) => {
            res.send(result);
    })
})
    .put('/favori/:userid/:poiid', (req, res) => {
        entitiesCtrl.addFavori({userId: req.params.userid ,
            poiId: req.params.poiid}).then((result) => {

                res.send(result);
        });
    });

router
    .get('/all', function (req, res) {
        entitiesCtrl.readAllPoi().then((result) => {
            res.send(result);
        })
    })
    .get('/:id', function (req, res) {
        let id = req.params.id;
        entitiesCtrl.readPoi(id).then((result) => {
            console.log(result);
            res.send(result);
    });

router
    .delete('/:id', function (req, res) {

    });

});

module.exports = router;