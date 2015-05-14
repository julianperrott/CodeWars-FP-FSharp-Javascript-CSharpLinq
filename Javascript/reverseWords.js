function reverseWords(str) {
    return str.split(" ").reverse().join(" ");
};

describe("reverseWords - ", function () {
    it("Hello", function () { expect(reverseWords("hello world!")).toEqual("world! hello"); });
    it("Yoda", function () { expect(reverseWords("yoda doesn't speak like this")).toEqual("this like speak doesn't yoda"); });
    it("foobar", function () { expect(reverseWords("foobar")).toEqual("foobar"); });
    it("row", function () { expect(reverseWords("boat your row row row")).toEqual("row row row your boat"); });
});
