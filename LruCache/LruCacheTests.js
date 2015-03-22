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