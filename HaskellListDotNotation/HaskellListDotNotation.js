function ArrayComprehension(options) {

    var generator = options.generator;
    if (!generator || generator.trim().length == 0) { return []; }

    if (generator.indexOf('..') == -1) {
        return generator.split(',').map(function (v) { return parseInt(v); });
    }

    var args = generator.split(',');
    switch (args.length) {
        case 1:
            var range = args[0].split('..').map(function (v) { return parseInt(v); });
            var start = range[0];
            var end = range[1];
            if (start > end) { return []; }
            return toList(start, end, 1);
        case 2:
            if (args[0].indexOf('..') != -1) { return []; }
            if (args[1].indexOf('..') == -1) { return []; }
            var range = args[1].split('..').map(function (v) { return parseInt(v); });
            var start = parseInt(args[0]);
            var end = range[1];
            var step = range[0] - start;
            if (step == 0) { return [];}
            return toList(start, end, step);
        default:
            return [];
    }
}

function toList(start, end, step) {
    var n = start;
    var result = [n];
    n += step;
    while (step > 0 ? n <= end : n >= end) {
        result.push(n);
        n += step;
    }
    return result;
}
