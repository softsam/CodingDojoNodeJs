var should = require('should');
describe('Array with should', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            var array = [1,2,3];
            array.indexOf(5).should.be.exactly(-1);
            array.indexOf(0).should.be.exactly(-1);
            array.indexOf(1).should.be.exactly(0);
            array.indexOf(2).should.be.exactly(1);
            array.indexOf(3).should.be.exactly(2);

        })
    });

    describe('#push()', function(){
        it('should increase size', function(){
            var array = [1, 2, 3];
            var length  =array.length;
            array.push(4);
            array.length.should.be.exactly(length+1);
            array.length.should.not.be.exactly(length);
        })
    });
});

describe('JSON with should', function(){
    describe('parse()', function(){

        it('should return an array', function(){
            should.doesNotThrow(function(){
                JSON.parse("[1,2,3]");
            });
        });
        it('should fail', function(){
            should.throws(function(){
                JSON.parse("[1,2,]");
            });
        });
    });

    describe('stringify()', function(){
        it('should return a string', function(){
            JSON.stringify([1,2,3]).should.be.a.String();
        })
    });
});
