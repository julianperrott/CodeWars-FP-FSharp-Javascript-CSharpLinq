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