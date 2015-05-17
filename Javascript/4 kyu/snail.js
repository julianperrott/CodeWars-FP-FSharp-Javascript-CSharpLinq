// "4 kyu","Snail","521c2db8ddc89b9b7a0000c1"

snail = function (array) {
    var arrayIndex = 0;
    var index = 0;
    var direction = 0;

    var boundsArray = [0, array.length-1];
    var boundsIndex = [0, array[0].length-1];

    if (array[0].length == 0) { return [];}

    var result = [array[0][0]];

    while (result.length < array.length * array.length) {

        switch (direction)
        {
            case 0: // right
                index += 1;
                if (index == boundsIndex[1])
                {
                    boundsArray[0]++;
                    direction++;
                }
                break;
            case 1: // down
                arrayIndex += 1;
                if (arrayIndex == boundsArray[1]) {
                    boundsIndex[1]--;
                    direction++;
                }

                break;
            case 2: // left
                index -= 1;
                if (index == boundsIndex[0]) {
                    boundsArray[1]--;
                    direction++;
                }

                break;
            case 3: // up
                arrayIndex -= 1;
                if (arrayIndex == boundsArray[0]) {
                    boundsIndex[0]++;
                    direction=0;
                }
                break;
        }

        result.push(array[arrayIndex][index]);
    }
    
    return result;
}

describe("Snail", function () {

    it("0 x 0", function () {

        var ar = [[]];

        expect(snail(ar)).toEqual([]);
    });

    it("1 x 1", function () {

        var ar = [[1]];

        expect(snail(ar)).toEqual([1]);
    });

    it("2 x 2", function () {

        var ar = [[1, 2], [4, 3]];

        expect(snail(ar)).toEqual([1, 2, 3, 4]);
    });

    it("3 x 3", function () {

        var ar = [[1, 2, 3],
         [8, 9, 4],
         [7, 6, 5]];

        expect(snail(ar)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("4 x 4", function () {

        var ar = [
            [1, 2, 3, 4],
            [12, 13, 14, 5],
            [11, 16, 15, 6],
            [10, 9, 8, 7]
        ];

        expect(snail(ar)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    });

    it("5 x 5", function () {

        var ar = [
            [1, 2, 3, 4, 5],
            [16, 17, 18, 19, 6],
            [15, 24, 25, 20, 7],
            [14, 23, 22, 21, 8],
            [13, 12, 11, 10, 9],

        ];

        expect(snail(ar)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
    });

});