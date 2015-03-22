describe("Ipv4ToInt32", function () {

    it("ToIntArray", function () {
        expect(ToIntArray("128.32.10.1")).toEqual([128,32,10,1]);
    });

    it("RightShift", function () {
        expect(RightShift([1,1,1,1])).toEqual([Math.pow(2, 24), Math.pow(2, 16), Math.pow(2, 8), Math.pow(2, 0)]);
    });

    it("Ipv4ToInt32", function () {
        expect(ipToInt32("128.32.10.1")).toEqual(2149583361);
    });
});