var express = require('express');
var debug= require('debug')('app:rest:developer');
var error= require('debug')('app:rest:developer');

debug.log = console.log.bind(console);


exports = module.exports = loadDevelopersRouter;




function loadDevelopersRouter(dao){
    var router = express.Router();



    router.param('developer_name', function(req, res, next, name) {
        req.developerName = name;
        next();
    });



    router.route('/').get(function(req, res, next){
        dao.list(function(err, developers) {
                if(err != null){
                    error('developers -get -  error %s', err);
                    next(err);
                }else{
                    debug('developers - get -  found %d', developers.length);
                    res.json(developers);
                }
            });

    }).post(function(req, res, next){
        //call dao.create
        var error = Error();
        error.status = 501;
        error.message = "Not Implemented";
        next(err);
    });

    router.route('/:developer_name/').get(function(req, res, next) {
        var developerName = req.developerName;
        dao.get(developerName
        , function (err, developer) {
            if(err != null){
                error('developer - get - error %s', err);
                next(err);
            }else{
                debug('developer - get - %s - found', developerName);
                res.json(developer);
            }
        });
    }).put(function(req, res, next) {
        //call dao.update
        var error = Error();
        error.status = 501;
        error.message = "Not Implemented";
        next(err);

    }).delete(function(req, res, next){
        //call dao.remove
        var error = Error();
        error.status = 501;
        error.message = "Not Implemented";
        next(err);
    });


    debug('developers loaded');
    return router;

}
