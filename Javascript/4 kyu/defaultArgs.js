// "4 kyu","Default Arguments","52605419be184942d400003d"
function defaultArguments(func, params) {

    var args = func.toString()
        .split("(")[1]
        .split(")")[0]
        .replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, "")
        .replace(/[\t\v\f\r\n \u00a0\u2000-\u200b\u2028-\u2029\u3000]+/g, "")
        .split(",");

    if (args[0]) { this.argNames = args; }

    return function () {
        var argArray = Array.prototype.slice.call(arguments);
        if (argArray.length > 0 && !argArray[0]) { return undefined; }
        return func.apply(this, this.argNames.map(function (arg, i) { return argArray[i] || params[arg]; }));
    }
}

describe("default args", function () {

    function add(a, b) { return a + b; };

    describe("{ b: 9 }", function () {

        var add_ = defaultArguments(add, { b: 9 });

        it("add_(10)", function () {
            expect(add_(10)).toEqual(19);
        });

        it("add_(10,7)", function () {
            expect(add_(10, 7)).toEqual(17);
        });

        it("add_()", function () {
            expect(add_()).toEqual(NaN);
        });
    }),

     describe("{ b: 3, a: 2 }", function () {
         var add_ = defaultArguments(add, { b: 9 });
         var add_ = defaultArguments(add_, { b: 3, a: 2 });

         it("add_(10)", function () {
             expect(add_(10)).toEqual(13);
         });

         it("add_()", function () {
             expect(add_()).toEqual(5);
         });
     }),

     describe("{ c: 3 }", function () {
         var add_ = defaultArguments(add, { b: 9 });
         var add_ = defaultArguments(add_, { b: 3, a: 2 });
         var add_ = defaultArguments(add_, { c: 3 });

         it("add_(10)", function () {
             expect(add_(10)).toEqual(13);
         });

         it("add_(10,10)", function () {
             expect(add_(10, 10)).toEqual(20);
         });
     });

});