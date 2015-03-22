describe("CountingChangeCombinations", function () {

    it("4 made up of [1, 2] = 3", function () {
        expect(countChange(4,[1,2])).toEqual(3);
    });

    it("10 made up of [5, 2, 3] = 4", function () {
        expect(countChange(10, [5, 2, 3])).toEqual(4);
    });

    it("11 made up of [5, 7] = 0", function () {
        expect(countChange(11, [5, 7])).toEqual(0);
    });
});