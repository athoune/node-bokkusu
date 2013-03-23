var Bokkusu = require('./index.js').Bokkusu,
    jsonstore = require('jsonstore');

var JsonStore = function(path, cb) {
    this.store = jsonstore.store(path, function(err) {
        cb(err);
    });
};

var store = function(path, cb) {
    var j = new JsonStore(path, function() {
        var b = new Bokkusu(j);
        cb.call(b);
    });
};

exports.store = store;

JsonStore.prototype.get = function(key, cb) {
    cb.call(this, null, this.store.data[key]);
};

JsonStore.prototype.set = function(key, value, cb) {
    this.store.data[key] = value;
    process.nextTick(cb, null);
};

JsonStore.prototype.sync = function(cb) {
    this.store.write(cb);
};

JsonStore.prototype.delete = function(key, cb) {
    if (this.store.data[key] == undefined) {
        cb.call(this, null, false);
    } else {
        delete this.store.data[key];
        cb.call(this, null, true);
    }
};

JsonStore.prototype.search = function(query, cb) {
    var that = this,
        responses = [];
    Object.keys(this.store.data).forEach(function(key) {
        var value = that.store.data[key];
        if (query.call(value)) {
            responses.push(value);
        }
    });
    cb.call(this, null, responses);
};
