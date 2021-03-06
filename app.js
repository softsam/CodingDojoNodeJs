var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('morgan');
var html = require('./routes/html')

var daos = require("./dao");

var developer = require("./routes/rest/developer")

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', html);

app.use('/services/developers/', developer(daos.developers));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("not found");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    console.log("enabling stacks");
    app.use(function(err, req, res, next) {
        console.error(err);
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}
else{
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render({
            message: err.message,
            error: {}
        });
    });

}


module.exports = app;

