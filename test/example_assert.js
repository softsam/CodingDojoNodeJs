var assert = require("assert");

describe('Array with assert', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            var array = [1,2,3];
            assert.equal(-1, array.indexOf(5));
            assert.equal(-1, array.indexOf(0));
            assert.equal(0, array.indexOf(1));
            assert.equal(1, array.indexOf(2));
            assert.equal(2, array.indexOf(3));
        })
    });

    describe('#push()', function(){
        it('should increase size', function(){
            var array = [1, 2, 3];
            var length  =array.length;
            array.push(4);
            assert.equal(length+1, array.length);
            assert.notEqual(length, array.length);
        })
    });
});

describe('JSON with assert', function(){
    describe('parse()', function(){

        it('should return an array', function(){
            assert.doesNotThrow(function() {
                JSON.parse("[1,2,3]");
            });
        });
        it('should fail', function(){
            assert.throws(function() {
                JSON.parse("{1,2,]");
            });
        });
    });

    describe('stringify()', function(){
        it('should return a string', function(){
            assert.equal(typeof JSON.stringify([1,2,3]), "string");
        })
    });
});