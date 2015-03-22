describe("Maybe", function () {

    describe("mDup", function () {

        function mDup(str) {
            return new Just(str + str);
        }


        it("mDup('abc')", function () {
            expect(mDup("abc").toString()).toEqual("Just abcabc");
        });

        it("bmDup(new Just('abc')", function () {
            var bmDup = Maybe.bind(mDup);
            var result = bmDup(new Just("abc"));

            expect(result.toString()).toEqual("Just abcabc"); // => new Just("abcabc")
        });


        it("bmDup(new Just('nothing')", function () {
            var bmDup = Maybe.bind(mDup);
            var nothing = new Nothing;
            var result = bmDup(nothing);

            expect(result.toString()).toEqual("Nothing"); // => new Nothing
        });

        it("bmDup(23)", function () {
            var bmDup = Maybe.bind(mDup);
            expect(function () { bmDup(23) }).toThrow();
        });

    }),

    describe("nonnegative", function () {

        function nonnegative(x) {
            if (isNaN(x) || 0 <= x) {
                return x;
            } else {
                throw "Argument " + x + " must be non-negative";
            }
        }
    


         it("nonnegative(2)", function () {
             var mNonnegative = Maybe.lift(nonnegative);
             var result = mNonnegative(2);           // => new Just 2
             expect(result.toString()).toEqual("Just 2");
         });

         it("nonnegative(-1)", function () {
             var mNonnegative = Maybe.lift(nonnegative);
             var result = mNonnegative(-1);          // => new Nothing
             expect(result.toString()).toEqual("Nothing");
         });

         it("nonnegative(undefined)", function () {
             var mNonnegative = Maybe.lift(nonnegative);
             var result = mNonnegative(undefined);   // => new Just undefined
             expect(result.just).toEqual(undefined);
         });
    }),

    describe("do", function () {
        it("Maybe.do(Maybe.unit('abc '), mDup, mTrim, mDup)", function () {
            var mDup = Maybe.lift(function (s) { return s + s; });
            var mTrim = Maybe.lift(function (s) { return s.replace(/\s+$/, ''); });
            var result = Maybe.do(Maybe.unit("abc "), mDup, mTrim, mDup);
            expect(result.toString()).toEqual("Just abc abcabc abc");
        });
    });
});