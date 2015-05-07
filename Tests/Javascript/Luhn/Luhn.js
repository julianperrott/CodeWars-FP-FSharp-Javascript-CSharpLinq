function validate(n) {
    return n.toString().split('')
        .map(doubleDigit)
        .map(singleDigit)
        .reduce(add)
        % 10 == 0;
}

function doubleDigit(v, i, ar) { return (ar.length - i) % 2 == 0 ? v * 2 : parseInt(v); }
function singleDigit(v) { return v > 9 ? v - 9 : v; }
function add(p, v) { return p + v; }


function remainder10Equals0(v) { return v % 10 == 0; }

function doubleDigits(ar) {
    return ar.map(doubleDigit);
}

function reduceToSingleDigit(ar) {
    return ar.map(singleDigit);
}

function sum(ar) {
    return ar.reduce(add);
}
