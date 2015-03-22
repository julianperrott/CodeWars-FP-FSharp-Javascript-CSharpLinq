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

