

var should = require('should');
var mockery = require('mockery');
var mongojs = require('mongojs');




var debug = require('debug')('app:test:dao');
var error = require('debug')('app:test:dao');
debug.log = console.log.bind(console);



var db, developerCollection, dao;


var dbHost = 'localhost';
var dbPort = 27017;
var dbName = 'CodingDojoNodeJsTest';

db = mongojs("mongodb://"+dbHost+':'+dbPort+'/'+dbName+"?connectTimeoutMS=200");



developerCollection = db.collection('developer');

describe('Dao', function(){

    before(function(done) {

        mockery.enable(); // Active mockery au debut des tests
        mockery.warnOnUnregistered(false);

        mockery.registerMock('./db', {developer : developerCollection});
        dao = require("../dao").developers;
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

    describe('list', function() {
        it('should return three objects', function(done) {
            dao.list(function(err,developers){
                (err === null).should.be.true;
                (developers === null).should.be.false;
                developers.length.should.be.exactly(3);
                done();
            });
        });
    });

    describe('get', function(){
        it('should not be found', function(done){
            //TODO Get a non existing developer
            done();
        });
        it('should be found', function(done){
            //TODO Get an existing user
            done();
        });
    });

    describe('create', function(){
        it('should be added', function(done){
            //TODO Create a developer and then test if it is added
            done();
        });
        it('should be in error due to existing name in db', function(done){
            //TODO Create a developer giving an existing name
            done();
        });
    });


    describe('update', function(){
        it('should be updated', function(done){
            //TODO Update an existing developer
            done();
        });
    });

    describe('remove', function(){
        it('should be removed', function(done){
            //TODO Remove an existing developer
            done();
        });
    });
})
