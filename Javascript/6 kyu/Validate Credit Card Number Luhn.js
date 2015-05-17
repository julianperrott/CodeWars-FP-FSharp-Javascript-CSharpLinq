// "6 kyu","Validate Credit Card Number","5418a1dd6d8216e18a0012b2"

function validate(n) {
    return n.toString().split('')
        .map(doubleDigit)
        .map(singleDigit)
        .reduce(add)
        % 10 == 0;
}

function doubleDigit(v, i, ar) { return (ar.length - i) % 2 == 0 ? v * 2 : parseInt(v); }
function singleDigit(v) { return v > 9 ? v - 9 : v; }
function add(p, v) { return p + v; }


function remainder10Equals0(v) { return v % 10 == 0; }

function doubleDigits(ar) {
    return ar.map(doubleDigit);
}

function reduceToSingleDigit(ar) {
    return ar.map(singleDigit);
}

function sum(ar) {
    return ar.reduce(add);
}

describe("Luhn", function () {
    it("doubleDigits even", function () {
        //double every digit
        expect(doubleDigits([1, 7, 1, 4])).toEqual([2, 7, 2, 4]);
    });

    it("doubleDigits odd", function () {
        //double every digit
        expect(doubleDigits([1, 2, 3, 4, 5])).toEqual([1, 4, 3, 8, 5]);
        expect(doubleDigits([8, 9, 1])).toEqual([8, 18, 1]);
    });

    it("reduceToSingleDigit", function () {
        //double every digit
        expect(reduceToSingleDigit([10, 2, 12, 18, 5, 14, 16])).toEqual([1, 2, 3, 9, 5, 5, 7]);
    });

    it("sum", function () {
        //double every digit
        expect(sum([1, 2, 3, 9, 5, 5, 7])).toEqual(1 + 2 + 3 + 9 + 5 + 5 + 7);
        expect(sum([8, 9, 1])).toEqual(18);
    });

    it("remainder10Equals0", function () {
        expect(remainder10Equals0(18)).toEqual(false);
        expect(remainder10Equals0(10)).toEqual(true);
        expect(remainder10Equals0(30)).toEqual(true);
        expect(remainder10Equals0(31)).toEqual(false);
    });

    it("validate 891", function () {
        expect(validate(891)).toEqual(false);
    });

    it("validate 123", function () {
        expect(validate(123)).toEqual(false);
    });

    it("validate 1", function () {
        expect(validate(1)).toEqual(false);
    });

    it("validate 2121", function () {
        expect(validate(2121)).toEqual(true);
    });
});
