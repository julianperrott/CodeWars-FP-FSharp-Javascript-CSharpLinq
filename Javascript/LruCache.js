function LRUCache(capacity, init) {
    var self = this;
    var queue = [];

    Object.defineProperty(this, 'size', {
        get: function () { return Object.keys(self).length; },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(this, 'capacity', {
        get: function () { return capacity; },
        set: function (newValue) {
            capacity = newValue;
            truncateQueue();
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(this, 'delete', {
        get: function () { return deleteFunction; },
        enumerable: false,
        configurable: false
    });

    var deleteFunction = function (key) {
        var index = queue.indexOf(key);
        if (index != -1) {
            queue.splice(index, 1);
        }
        return delete self[key];
    };

    var UpdateCache = function (key){
        var index = queue.indexOf(key);
        if (index != -1) { queue.splice(index, 1); };
        queue.push(key);
        truncateQueue();
    }

    var truncateQueue = function()
    {
        while (queue.length > self.capacity) {
            var removed = queue.shift();
            delete self[removed];
        }
    }

    var cacheFunction = function (name, value) {
        Object.defineProperty(self, name, {
            get: function () { return value; },
            set: function (newValue) {
                value = newValue;
                UpdateCache(name);
            },
            enumerable: true,
            configurable: true
        });
        UpdateCache(name);
        return self;
    };

    Object.defineProperty(this, 'cache', {
        get: function () { return cacheFunction; },
        enumerable: false,
        configurable: false
    });


    if (init) {
        for (var propt in init) {
            self.cache(propt, init[propt]);
            break;
        }
    }
}

describe("LRU Cache", function () {

    it("size", function () {
        var store = new LRUCache(3, { a: 1 });

        expect(store.size).toEqual(1);
    });

    it("capacity", function () {
        var store = new LRUCache(3, { a: 1 });
        expect(store.capacity).toEqual(3);
    });

    it("a", function () {
        var store = new LRUCache(3, { a: 1 });
        expect(store.a).toEqual(1);
    });

    it("cache('b', 2)['b']", function () {
        var store = new LRUCache(3, { a: 1 });
        expect(store.cache('b', 2)['b']).toEqual(2);
    });

    it("store.a = 5", function () {
        var store = new LRUCache(3, { a: 1 });
        store.a = 5
        expect(store.a).toEqual(5);
    });

    it("store.cache('c', 3).cache('d', 4)", function () {
        var store = new LRUCache(3, { a: 1 });
        store.a = 5;
        store.cache('c', 3).cache('d', 4);

        expect(store.b).toEqual(undefined);
        expect(store.c).toEqual(3);
        expect(store.d).toEqual(4);
        expect(store.a).toEqual(5);
        expect(store.size).toEqual(3);
    });

    it("store.delete('delete') = false", function () {
        var store = new LRUCache(3, { a: 1 });
        expect(store.delete('delete')).toEqual(false);
    });

    it("store.delete('d') = true", function () {
        var store = new LRUCache(3, { a: 1 });
        store.cache('c', 3).cache('d', 4);
        expect(store.delete('d')).toEqual(true);
        expect(store.d).toEqual(undefined);
        expect(store.size).toEqual(2);
    });

    it("store.capacity = 1", function () {
        var store = new LRUCache(3, { a: 1 });
        store.cache('c', 3).cache('d', 4);
        store.cache('c', 4);
        expect(store.c).toEqual(4);
        store.capacity = 1;

        expect(Object.keys(store).length).toEqual(1);
    });

    it("store.capacity = 1", function () {
        var store = new LRUCache(3, { a: 1 });
        store.cache('c', 3).cache('d', 4);
        store.cache('c', 4);
        expect(store.c).toEqual(4);
        store.capacity = 1;

        expect(Object.keys(store)[0]).toEqual('c');
    });

    it("All", function () {
        var store = new LRUCache(3, { a: 1 });
        expect(store.size).toEqual(1);
        expect(store.capacity).toEqual(3);
        expect(store.a).toEqual(1);
        expect(store.cache('b', 2)['b']).toEqual(2);
        store.a = 5;
        expect(store.a).toEqual(5);
        store.cache('c', 3).cache('d', 4);
        expect(store.b).toEqual(undefined);
        expect(store.c).toEqual(3);
        expect(store.d).toEqual(4);
        expect(store.a).toEqual(5);
        expect(store.size).toEqual(3);
        expect(store.delete('delete')).toEqual(false);
        expect(store.delete('d')).toEqual(true);
        expect(store.d).toEqual(undefined);
        expect(store.delete('e')).toEqual(true);
        expect(store.size).toEqual(2);
        store.cache('c', 4);
        expect(store.c).toEqual(4);
        store.capacity = 1;
        expect(Object.keys(store).length).toEqual(1);
        expect(Object.keys(store)[0]).toEqual('c');
    });
});