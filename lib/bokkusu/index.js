
var maplist = function() {
    this.data = {};
};

maplist.prototype.add = function(key, value) {
    if (this.data[key] == null) {
        this.data[key] = [value];
    } else {
        this.data[key].push(value);
    }
};

var all = function(fns) {
    fn = fns.shift();
};

maplist.prototype.get = function(key) {
    return this.data[key];
};

var Bokkusu = function(store) {
    this.store = store;
    this.hook = {};
    this.hook.pre = new maplist();
    this.hook.post = new maplist();
};

exports.Bokkusu = Bokkusu;

Bokkusu.prototype.get = function(key, cb) {
    return this.store.get(key, cb);
};

Bokkusu.prototype.set = function(key, value, cb) {
    return this.store.set(key, value, cb);
};

/** multiple set */
Bokkusu.prototype.bulk = function(datas, cb) {
    var cpt = 0,
        that = this;
    Object.keys(datas).forEach(function(d) {
        cpt++;
        that.set(d, datas[d], function() {
            cpt--;
            if (cpt == 0) {
                cb.call(that, null);
            }
        });
    });
};

Bokkusu.prototype.delete = function(key, cb) {
    return this.store.delete(key, cb);
};

Bokkusu.prototype.clear = function(cb) {
    return this.store.clear(cb);
};

Bokkusu.prototype.pre = function(evt, hook) {
    this.hook.pre.add(evt, hook);
};

Bokkusu.prototype.post = function(evt, hook) {
    this.hook.post.add(evt, hook);
};