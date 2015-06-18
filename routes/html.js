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
    res.sendfile('public/html/hello.html', {root: __dirname+'/../' })
});


module.exports = router;
