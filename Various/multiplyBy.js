function multiplyBy(x, y, n) {

    return Array.apply(0, Array(n)).map(function ()
    {
        return x *= y;  // mutates x
    })

    if (n == 0) { return []; }
    if (n == 1) { return [x * y]; }
    return [x * y].concat(multiplyBy (x*y,y,n-1));


    return Array.apply(null, { length: n-1 })
        .reduce(function (p, c)
        {
            p.push(p[p.length-1] * y);
            return p; // or return p.concat(p[p.length-1]*y)
        }, [x * y])

};

describe("multiplyBy - ", function () {

    it("2 4 6", function () {
        expect(multiplyBy(2,4,6)).toEqual([8,32,128,512,2048,8192]);
    });
});