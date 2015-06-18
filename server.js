#!/bin/env node

var defaultDebugMode =   "app:*";
if(typeof process.env.DEBUG == "undefined"){
    console.log("Adding DEBUG variable to "+defaultDebugMode);
    process.env.DEBUG=defaultDebugMode;
}else{
    console.log("DEBUG already set to "+defaultDebugMode);
}

var http = require('http');
var path = require('path');
var debug = require('debug')('app:server');
var error = require('debug')('app:server');
var app = require("./app");

debug.log = console.log.bind(console);

var server = http.createServer( app);

var host = null;
var port = 8080;

debug("server will listen on %s:%d",  host == null? "*" : host, port);
server.listen(port, host, function () {
    var mDate = new Date(Date.now());
    debug('%s: Node server started on %s:%d ...', mDate, host == null? "*" : host, port);
});


