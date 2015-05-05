function squareDigits(num) {

    if (num < 0) { return -squareDigits(-num); }

    return parseInt(
        num.toString()
        .split('')
        .map(function (digit) { return Math.pow(parseInt(digit), 2); })
        .join(''));
}

describe("squareDigits - ", function () {

    //it("-1", function () {
    //    expect(squareDigits(-1)).toEqual(-1);
    //});

    //it("1", function () {
    //    expect(squareDigits(1)).toEqual(1);
    //});

    it("81", function () {
        expect(squareDigits(81)).toEqual(641);
    });

    it("9119", function () {
        expect(squareDigits(9119)).toEqual(811181);
    });

    it("-9119", function () {
        expect(squareDigits(-9119)).toEqual(-811181);
    });
});
