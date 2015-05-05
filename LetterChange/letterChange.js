function letterChange(str) {

    function nextChar(c) {
        switch (c) {
            case 'Z': return 'A';
            case 'z': return 'a';
            case ' ': return ' ';
            default: return String.fromCharCode(c.charCodeAt(0) + 1);
        };
    };

    return str.split("").map(nextChar).join("");
};

describe("letterChange - ", function () {
    it("JavaScript", function () { expect(letterChange("JavaScript")).toEqual("KbwbTdsjqu"); });
    it("Lorem Ipsum", function () { expect(letterChange("Lorem Ipsum")).toEqual("Mpsfn Jqtvn"); });
    it("Z", function () { expect(letterChange("Z")).toEqual("A"); });
    it("z", function () { expect(letterChange("z")).toEqual("a"); });
});