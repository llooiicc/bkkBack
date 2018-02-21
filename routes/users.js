let express = require('express');
let router = express.Router();
let EntitiesCtrl = require('../bin/Controllers/EntitesController');
let Auth = require('../bin/auth/Auth');

let entitiesCtrl = new EntitiesCtrl();
let auth = new Auth();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router
    .post('/register', (req, res) => {
        entitiesCtrl.addUser(req.body).then((result) => {
          res.send(result);
        });
    })
    .post('/auth' , (req, res) => {
        auth.login(req.body).then((result) => {
          res.send(result);
        });
    });

module.exports = router;
