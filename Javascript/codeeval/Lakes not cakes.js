function toCoord(map) {
    return map
        .split("|")
        .map(function (b) { return b.trim(); })
        .map(function (row, rowIndex) {
            return row.split(" ")
                .map(function (mapItem, colIndex) {
                    return mapItem == "o" ? [rowIndex, colIndex] : undefined;
                })
                .filter(function (val) { return val; });
        })
        .reduce(function (acc, val) { return acc.concat(val); }, []);
}

// lakeCoords [row,col, group]


function parseLakes(lakeCoords) {
    var lakeCount = lakeCoords.length;
    var lakeGroup = 0;

    for (var i = 0; i < lakeCoords.length; i++) {
        var lake = lakeCoords[i];
        var adjacent = [];
        for (var j = i - 1; j > -1; j--) {

            var previousLake = lakeCoords[j];
            if (previousLake[0] < lake[0] - 1) {
                break; // moved 2 rows back
            }

            // is the lake adjacent
            if (previousLake[1] == lake[1] + 1 || previousLake[1] == lake[1] || previousLake[1] == lake[1 - 1]) {
                adjacent.push(previousLake);
            }
        }
        if (adjacent.length == 0) {
            lakeGroup++;
            lake.push(lakeGroup);
        }
        else {
            lakeCount--;

            if (adjacent.length == 0) {
                lake.push(adjacent[0][2]); // adopt the same lake group
            }
            else {

                var distinctLakesGroups = [];

                // get the distinct lake group ids
                adjacent.map(function (val) { return val[2]; })
                    .sort()
                    .forEach(function (val) {
                        if (distinctLakesGroups.indexOf(val) == -1) { distinctLakesGroups.push(val); }
                    });

                lake.push(distinctLakesGroups[0][2]); // adopt the same lake group as the lowest 

                if (distinctLakesGroups.length > 1) {
                    for (var l = 0; l < i; l++) {
                        if (distinctLakesGroups.indexOf(lakeCoords[l][2] > 0)) {
                            lakeCoords[l][2] = adjacent[0][2]; // replace 
                        };
                    }
                }
                lakeCount -= distinctLakesGroups.length - 1;
            }
        }
    }
    return lakeCount;
}

describe("toCoord", function () {
    it("3x3 1", function () { expect(toCoord("o # o | # # # | o # o")).toEqual([[0, 0], [0, 2], [2, 0], [2, 2]]) });
    it("3x3 2", function () { expect(toCoord("o # o | # o # | o # o")).toEqual([[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]]) });
});

describe("parseLakes", function () {
    it("3x3 1", function () { expect(parseLakes(toCoord("o # o | # # # | o # o"))).toEqual(4); });
    it("3x3 2", function () { expect(parseLakes(toCoord("o # o | # o # | o # o"))).toEqual(1); });
});

//o # o | 
//# o # | 
//o # o"

/*

walk backwards through them looking for adjacent lakes.. until the x is x-2 from the lake or the y is -2

if the list has no members, assign the lake group to the lake and increase it by one.
if the list has one member, decrease the lake count by one, assign the other lake group to this one.
if the list has more than one member , decrease the lake count by one, assign the other lake group to this one.
 + find the highest lake group in the matches, if it is different make all lakes with this number to this numer
	+ reduce the lake count by one
*/