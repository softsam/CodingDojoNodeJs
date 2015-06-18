

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
            //TODO : Request a non existing developer
            done();
        });
        it('should be found', function(done){
            //TODO : Request an existing developer
            done();
        });
    });

    describe('POST', function(){
        it('should be added', function(done){
            //TODO Post a new developer and then test if it is added
            done();
        });
        it('should be in error due to missing parameter', function(done){
            //TODO Post a new developer without giving the name
            done();
        });
        it('should be in error due to existing name in db', function(done){
            //TODO Post a new developer giving an existing name
            done();
        });
    });


    describe('PUT', function(){
        it('should be updated', function(done){
            //TODO Update an existing developer
            done();
        });
    });

    describe('DELETE', function(){
        it('should be updated', function(done){
            //TODO Remove an existing developer
            done();
        });
    });
})