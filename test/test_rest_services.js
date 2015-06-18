

var should = require('should');
var mockery = require('mockery');
var mongojs = require('mongojs');
var request = require('supertest');




var debug = require('debug')('app:test:dao');
var error = require('debug')('app:test:dao');
debug.log = console.log.bind(console);



var db, developerCollection, app;


var dbHost = 'localhost';
var dbPort = 27017;
var dbName = 'CodingDojoNodeJsTest';


describe('Rest Developers Api', function(){

    before(function(done) {
        db = mongojs("mongodb://"+dbHost+':'+dbPort+'/'+dbName+"?connectTimeoutMS=200");


        developerCollection = db.collection('developer');

        mockery.enable(); // Active mockery au debut des tests
        mockery.warnOnUnregistered(false);

        mockery.registerMock('./db', {developer : developerCollection});
        app = require("../app");
        done();
    });

    beforeEach(function(done) {
        developerCollection.drop(function(){
            //populate
            var bulk = developerCollection.initializeOrderedBulkOp();
            bulk.insert({_id : 'Toto', gender : 'male', agile : true});
            bulk.insert({_id : 'Tata', gender : 'female', agile : true});
            bulk.insert({_id : 'Tutu', gender : 'male', agile : true});

            bulk.execute(function(err, res) {
                if(err)
                    throw err;
                else{
                    done();
                }
            });
        });
    });

    afterEach(function(done) {
        //WARNING: this is not run after EACH test and BETWEEN test
        done();
    });

    after(function(done) {
        mockery.deregisterAll();
        mockery.disable(); // Disable Mockery after tests are completed
        db.dropDatabase(function(){
            console.log('database dropped');
            done();
        });
    });

    describe('GET ALL', function() {
        it('should return three objects', function(done) {
            request(app).get('/services/developers/').end(function(err, res){
                (err === null).should.be.true();
                res.status.should.be.exactly(200);
                should.doesNotThrow(function(){
                    JSON.parse(res.text);
                });

                var developers = JSON.parse(res.text);
                developers.length.should.be.exactly(3);
                done();
            });
        });
    });

    describe('GET', function(){
        it('should not be found', function(done){
            request(app).get('/services/developers/Tyty/').end(function(err, res){
                (err === null).should.be.false();
                err.status.should.be.exactly(404);
                done();
            });
        });
        it('should be found', function(done){
            request(app).get('/services/developers/Toto/').end(function(err, res){
                (err === null).should.be.true();
                res.status.should.be.exactly(200);
                should.doesNotThrow(function(){
                    JSON.parse(res.text);
                });
                var developer = JSON.parse(res.text);
                developer.should.have.property("name", "Toto");
                developer.should.have.property("gender", "male");
                developer.should.have.property("agile", true);
                done();
            });
        });
    });

    describe('POST', function(){
        it('should be added', function(done){
            request(app).post('/services/developers/')
                .type('form')
                .send({name : 'Titi'})
                .send({gender: 'male'})
                .send({agile : false})
                .redirects(0)//do not follow redirect
                .end(function(err, res){
                    res.status.should.be.exactly(302);
                    err.status.should.be.exactly(302);
                    res.header.should.have.property("location","/services/developers/Titi/" );
                    done();
                });
        });
        it('should be in error due to missing parameter', function(done){
            request(app).post('/services/developers/')
                .type('form')
                .send({gender: 'male'})
                .send({agile : ""})
                .redirects(0)//do not follow redirect
                .end(function(err, res){
                    res.status.should.be.exactly(400);
                    err.status.should.be.exactly(400);
                    done();
                });

        });
        it('should be in error due to existing name in db', function(done){
            request(app).post('/services/developers/')
                .type('form')
                .send({name : 'Toto'})
                .send({gender: 'male'})
                .send({agile : false})
                .redirects(0)//do not follow redirect
                .end(function(err, res){
                    res.status.should.be.exactly(409);
                    err.status.should.be.exactly(409);
                    done();
                });
        });
    });


    describe('PUT', function(){
        it('should be updated', function(done){
            request(app).put('/services/developers/Toto/')
                .type('form')
                .send({gender: 'male'})
                //.send({agile : false})
                .redirects(0)//do not follow redirect
                .end(function(err, res){
                    (err === null).should.be.true();
                    res.status.should.be.exactly(205);
                    developerCollection.findOne({
                        _id: "Toto"
                    }, function (errDb, developer) {
                        (errDb === null).should.be.true();
                        (developer !== null).should.be.true();
                        developer.should.have.property("_id", "Toto");
                        developer.should.have.property("gender", "male");
                        developer.should.have.property("agile", false);
                        done();
                    });
                });
        });
    });

    describe('DELETE', function(){
        it('should be updated', function(done){
            request(app).delete('/services/developers/Toto/')
                .end(function(err, res){
                    (err === null).should.be.true();
                    res.status.should.be.exactly(204);
                    developerCollection.findOne({
                        _id: "Toto"
                    }, function (errDb, developer) {
                        (err === null).should.be.true();
                        (developer === null).should.be.true();
                        done();
                    });
                });
        });
    });
})