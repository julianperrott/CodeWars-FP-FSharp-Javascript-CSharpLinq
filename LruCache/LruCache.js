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