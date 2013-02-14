var Bokkusu = require('./index.js').Bokkusu,
    jsonstore = require('jsonstore'),
    util = require('util');

var JsonStore = function(path, cb) {
    this.store = jsonstore.store(path, function(err) {
        cb(err);
    });
};

util.inherits(JsonStore, Bokkusu);

var store = function(path, cb) {
    var j = new JsonStore(path, function() {
        var b = new Bokkusu(j);
        cb.call(b);
    });
};

exports.store = store;

JsonStore.prototype.get = function(key, cb) {
    cb(null, this.store.data[key]);
};

JsonStore.prototype.set = function(key, value, cb) {
    this.store.data[key] = value;
    this.store.write(cb);
};
