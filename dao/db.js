var mongojs = require('mongojs');
var debug= require('debug')('app:dao:db');
debug.log = console.log.bind(console);



var dbHost = 'localhost';
var dbPort = 27017;
var dbName = 'CodingDojoNodeJs';






var db = mongojs(dbHost+':'+dbPort+'/'+dbName);






debug('db loaded');
module.exports =  {
    developer : db.collection('developer')
} ;





