/**
 * Created by buce8373 on 02/06/2015.
 */

var express = require('express');
var debug = require('debug')('app:routes:html');
var router = express.Router();


debug.log = console.log.bind(console);

/* GET home page. */
router.get('/', function(req, res) {
    debug('serving hello');
    res.render('hello', {title: 'Jade Hello' })
});


router.get('/developers/', function(req, res) {
    debug('serving developers');
    res.render('developers', {title: 'Developers' })
});

module.exports = router;
