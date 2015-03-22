var recoverSecret = function (triplets) {

    var isOnlyFirst = function (letter) {
        var indexes = triplets.map(function (ar) { return ar.indexOf(letter); });
        return Math.max.apply(null, indexes) == 0;
    };

    var firstChar = triplets.reduce(function (pv, array) {
        if (pv != null) { return pv; }
        return isOnlyFirst(array[0]) ? array[0] : null;
    }, null);

    if (firstChar == null) { return ""; }

    var newTriplets = triplets.map(function (ar) {
        if (ar[0] == firstChar) { ar.splice(0, 1); }
        return ar;
    });

    return firstChar + recoverSecret(newTriplets);
}



