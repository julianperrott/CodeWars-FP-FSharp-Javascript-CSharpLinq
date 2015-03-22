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