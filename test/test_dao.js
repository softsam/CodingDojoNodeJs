

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





describe('Dao', function(){

    before(function(done) {
        db = mongojs("mongodb://"+dbHost+':'+dbPort+'/'+dbName+"?connectTimeoutMS=200");



        developerCollection = db.collection('developer');

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
                (err === null).should.be.true();
                (developers === null).should.be.false();
                developers.length.should.be.exactly(3);
                done();
            });
        });
    });

    describe('get', function(){
        it('should not be found', function(done){
            dao.get("Tyty", function(err, developer){
                (err !== null).should.be.true();
                (developer === null).should.be.true();
                done();
            });
        });
        it('should be found', function(done){
            dao.get("Toto", function(err, developer){
                (err === null).should.be.true();
                (developer !== null).should.be.true();
                developer.should.have.property("name", "Toto");
                developer.should.have.property("gender", "male");
                developer.should.have.property("agile", true);
                done();
            });
        });
    });

    describe('create', function(){
        it('should be added', function(done){
            dao.create('Titi', "male", false, function(err){
                (err === null).should.be.true();
                dao.get("Titi", function(err, developer){
                    (err === null).should.be.true();
                    (developer === null).should.be.false();
                    developer.should.have.property("name", "Titi");
                    developer.should.have.property("gender", "male");
                    developer.should.have.property("agile", false);
                    done();
                });
            });
        });

        it('should be in error due to existing name in db', function(done){
            dao.create('Toto', "male", false, function(err){
                (err !== null).should.be.true()
                console.log("err="+JSON.stringify(err)+"\n");
                done();
            });
        });
    });


    describe('update', function(){
        it('should be updated', function(done){
            dao.update("Tata", "female", false, function(err, updated){
                (err === null).should.be.true();
                dao.get("Tata", function(err, developer){
                    (err === null).should.be.true();
                    (developer === null).should.be.false();
                    developer.should.have.property("name", "Tata");
                    developer.should.have.property("gender", "female");
                    developer.should.have.property("agile", false);
                    done();
                });
            });
        });
    });

    describe('remove', function(){
        it('should be removed', function(done){
            dao.remove("Tutu", function(err){
                (err === null).should.be.true();
                dao.get("Tutu", function(err, developer){
                    (err !== null).should.be.true();
                    (developer === null).should.be.true();
                    err.status.should.be.exactly(404);
                    done();
                });
            })
        });
    });
});
