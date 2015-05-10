

function convert(from, to, str) {
    var toArray=to.split("");
    var value = toBase(to.length, toDecimal(from, str))
              .reverse()
              .map(function (i) { return toArray[i] })
              .join("");

    return value.length > 0 ? value : to.substring(0,1);
};

function toDecimal(from, str) {
    return str.split("")
        .map(function (v) { return from.indexOf(v); })
        .map(function (x, i) { return Math.pow(from.length, -1 + str.length - i) * x; })
        .reduce(function (a, b) { return a + b; })
}

function toBase(len, value) {
    if (value == 0) { return []; }
    var remainder = value % len;
    var quotient = (value - remainder) / len;
    return [remainder].concat(toBase(len, quotient));
}

describe("convert - ", function () {

    var bin = "01";
    var oct = "01234567";
    var dec = "0123456789";
    var hex = "0123456789abcdef";
    var alphaLower = "abcdefghijklmnopqrstuvwxyz";
    var alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var alphaNumeric = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    it("ToDecimal_alphaLowerToHex", function () {
        expect(toDecimal(alphaLower, "hello")).toEqual(3276872);
    });

    it("ToDecimal_alphaLower", function () {
        expect(toDecimal(alpha, "EaCfEvxNcbScvR")).toEqual(609979409672590158309775);
    });

    it("toBase16", function () {
        expect(toBase(16, 3276872)).toEqual([8,4,0,0,2,3]);
    });

    it("alphaLowerToHex", function () {
        expect(convert(alphaLower, hex, "hello")).toEqual("320048");
    });

    it("DecToBin", function () {
        expect(convert(dec, bin, "15")).toEqual("1111");
    });

    it("DecToOct", function () {
        expect(convert(dec, oct, "15")).toEqual("17");
    });

    it("BinToDec", function () {
        expect(convert(bin, dec, "1010")).toEqual("10");
    });

    it("BinToHex", function () {
        expect(convert(bin, hex, "1010")).toEqual("a");
    });

    it("DecToAlpha", function () {
        expect(convert(dec, alpha, "0")).toEqual("a");
    });

    it("DecToAlphaLower", function () {
        expect(convert(dec, alphaLower, "27")).toEqual("bb");
    });
});