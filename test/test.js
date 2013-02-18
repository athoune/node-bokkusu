var fs = require('fs'),
    should = require('should'),
    jsonStore = require('../lib/bokkusu/jsonstore').store;

describe('bokkusu', function() {
    var PATH = '/tmp/toto.json';

    beforeEach(function() {
        fs.unlinkSync(PATH);
    });

    it('should store something', function(done) {
        jsonStore(PATH, function(error) {
            if (error) throw error;
            var bokkusu = this;
            bokkusu.bulk({'1': 'robert', '2': 'paul'}, function(error) {
                if (error) throw error;
                bokkusu.get('2', function(error, value) {
                    if (error) throw error;
                    value.should.eql('paul');
                    done();
                });
            });
        });
    });

    it('should search something', function(done) {
        jsonStore(PATH, function(error) {
            if (error) throw error;
            var bokkusu = this;
            var data = {
                'jdoe': {name: 'John', lastname: 'Doe', age: 42}};
            bokkusu.bulk(data, function(error) {
                if (error) throw error;
                bokkusu.search(function() { return this.age > 41; }, function(error) {
                    if (error) throw error;
                    done();
                });
            });
        });
    });
});
