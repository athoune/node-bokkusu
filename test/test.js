var fs = require('fs'),
    should = require('should'),
    jsonStore = require('../lib/bokkusu/jsonstore').store;

describe('bokkusu', function() {
    var PATH = '/tmp/toto.json';

    beforeEach(function() {
        fs.unlinkSync(PATH);
    });

    it('should store something', function(done) {
        jsonStore(PATH, function() {
            var bokkusu = this;
            bokkusu.bulk({'1': 'robert', '2': 'paul'}, function(error) {
                bokkusu.get('2', function(err, value) {
                    value.should.eql('paul');
                    done();
                });
            });
        });
    });
});
