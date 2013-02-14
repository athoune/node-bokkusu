var jsonStore = require('../lib/bokkusu/jsonstore').store;

describe('bokkusu', function() {
    it('should store something', function() {
        jsonStore('/tmp/toto.js', function() {
            var bokkusu = this;
            bokkusu.bulk({'1': 'robert', '2': 'paul'}, function(error) {
                console.log(bokkusu.store.store);
                asyncSpecDone();
            });
        });
    });
});
