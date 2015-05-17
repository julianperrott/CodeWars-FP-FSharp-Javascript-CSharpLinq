// "3 kyu","Monads:  The Maybe Monad","52793ed3fdb8e19406000c72"

/////////////////////////////////////////////////////////////////
function Maybe() {
    Object.freeze(this);
};

/////////////////////////////////////////////////////////////////
function Just(x) {
    this.toString = function () { return "Just " + x.toString(); };
    this.just = x;
    Object.freeze(this);
};
Just.prototype = new Maybe();
Just.prototype.constructor = Just;

/////////////////////////////////////////////////////////////////
function Nothing() {
    this.toString = function () { return "Nothing"; };
    Object.freeze(this);
};
Nothing.prototype = new Maybe();
Nothing.prototype.constructor = Nothing;

/////////////////////////////////////////////////////////////////
Maybe.unit = function (x) {
    // return a Maybe that holds x
    return new Just(x);
};

Maybe.bind = function (g) {
    // given a function from a value to a Maybe return a function from a Maybe to a Maybe
    return function (m) {
        if (!(m instanceof Maybe)) { throw "Argument Invalid"; }
        if (m instanceof Nothing) { return m; }
        return g(m.just);
    };
};

Maybe.lift = function (f) {
    // given a function from value to value, return a function from value to Maybe
    // if f throws an exception, (lift f) should return a Nothing
    return function (x) {
        try { return new Just(f(x)); }
        catch (err) { return new Nothing(); };
    };
};

Maybe.do = function (m) {
    var fns = Array.prototype.slice.call(arguments, 1);
    // given a Maybe m and some functions fns, run m into the first function,
    // pass that result to the second function, etc. and return the last result

    return fns.reduce(function (pv, cv) { return Maybe.bind(cv)(pv); }, m);
};



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