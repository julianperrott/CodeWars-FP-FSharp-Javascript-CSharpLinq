function tenMinuteWalk(walk) {
    function count(match) { return walk.filter(function (c) { return c == match; }).length; };
    return walk.length == 10 && count('n') == count('s') && count('e') == count('w');
};

describe("tenMinuteWalk - ", function () {
    it("valid1", function () { expect(tenMinuteWalk([ 'n', 's', 'n', 's', 'n', 's', 'n', 's', 'n', 's'])).toEqual(true); });
    it("valid2", function () { expect(tenMinuteWalk(['n', 's', 'e', 'w', 'n', 's', 'e', 'w', 'n', 's'])).toEqual(true); });
    it("invalid1", function () { expect(tenMinuteWalk(['n', 's', 'n', 's', 'n', 's', 'n', 's', 'n', 'n'])).toEqual(false); });
    it("invalid2", function () { expect(tenMinuteWalk(['n', 's'])).toEqual(false); });
});