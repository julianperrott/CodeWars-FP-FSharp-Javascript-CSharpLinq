//"6 kyu","IPv4 to int32","52ea928a1ef5cfec800003ee"

function ipToInt32(ip) {
    return ip.split(".").reduce(function (p, c, i) { return p + (c << ((3 - i) * 8)); }, 0) >>> 0;
}

function ToIntArray(ip)
{
    return ip.split(".").map(function (v) { return parseInt(v); });
}

function RightShift(ints)
{
    return ints.map(function (v,i) {
        return v << ((3-i)*8); 
    });
}

describe("Ipv4ToInt32", function () {

    it("ToIntArray", function () {
        expect(ToIntArray("128.32.10.1")).toEqual([128, 32, 10, 1]);
    });

    it("RightShift", function () {
        expect(RightShift([1, 1, 1, 1])).toEqual([Math.pow(2, 24), Math.pow(2, 16), Math.pow(2, 8), Math.pow(2, 0)]);
    });

    it("Ipv4ToInt32", function () {
        expect(ipToInt32("128.32.10.1")).toEqual(2149583361);
    });
});