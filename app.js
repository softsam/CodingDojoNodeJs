var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var html = require('./routes/html')



var app = express();

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', html);

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

