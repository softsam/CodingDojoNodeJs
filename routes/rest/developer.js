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
        if (typeof req.body.name == "undefined" || req.body.name == ""){
            var badRequestError = Error();
            badRequestError.status = 400;
            badRequestError.message = "Bad Request";
            next(badRequestError);
        }else{
            dao.create(req.body.name, req.body.gender, req.body.agile, function(err){
                if(err != null){
                    error('developers - post -  error %s', err);
                    next(err);
                }else{
                    res.redirect(req.originalUrl+req.body.name+"/");
                }
            });
        }
    });

    router.route('/:developer_name/').get(function(req, res, next) {
        dao.get(req.developerName
            , function (err, developer) {
                if(err != null){
                    error('developer - get - error %s', err);
                    next(err);
                }else{
                    debug('developer - get - %s - found', req.developerName);
                    res.json(developer);
                }
        });
    }).put(function(req, res, next) {
        dao.update(req.developerName, req.body.gender, req.body.agile, function(err, updated){
            if(err != null){
                error('developer - put - error %s', err);
                next(err);
            }else{
                debug('developer - put - %s - updated - %s', req.developerName, JSON.stringify(updated));
                res.sendStatus(205).end();
            }
        });
    }).delete(function(req, res, next){
        dao.remove( req.developerName, function(err){
            if(err != null) {
                error('developer - delete - error %s', err);
                next(err);
            }else{
                debug('developer - delete - %s', req.developerName);
                res.sendStatus(204).end();
            }
        });
    });


    debug('developers loaded');
    return router;

}
