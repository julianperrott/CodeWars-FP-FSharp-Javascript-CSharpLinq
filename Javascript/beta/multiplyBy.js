function multiplyBy(x, y, n) {

    // reduce
    return Array.apply(null, { length: n - 1 })
        .reduce(function (p, c) {
            return p.concat(p[p.length - 1] * y)
        }, [x * y]);

    // mutate x
    return Array.apply(0, Array(n)).map(function () {
        return x *= y;
    });

    // recursion
    if (n == 0) { return []; }
    return [x * y].concat(multiplyBy (x*y,y,n-1));

};

describe("multiplyBy - ", function () {

    it("2 4 6", function () {
        expect(multiplyBy(2,4,6)).toEqual([8,32,128,512,2048,8192]);
    });
});