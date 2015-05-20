/* http://www.codewars.com/kata/53db96041f1a7d32dc0004d2
Write a function done_or_not passing a board (list[list_lines]) as parameter. If the board is valid return 'Finished!', otherwise return 'Try again!'

Sudoku rules:

Complete the Sudoku puzzle so that each and every row, column, and region contains the numbers one through nine only once.

Rows:

5 3 8 6 9 7 4 1 2

There are 9 rows in a traditional Sudoku puzzle. Every row must contain the numbers 1, 2, 3, 4, 5, 6, 7, 8, and 9. There may not be any duplicate numbers in any row. In other words, there can not be any rows that are identical.

In the illustration the numbers 5, 3, 1, and 2 are the "givens". They can not be changed. The remaining numbers in black are the numbers that you fill in to complete the row.

Columns:
7
4
8
5
9
2
1
3
6


There are 9 columns in a traditional Sudoku puzzle. Like the Sudoku rule for rows, every column must also contain the numbers 1, 2, 3, 4, 5, 6, 7, 8, and 9. Again, there may not be any duplicate numbers in any column. Each column will be unique as a result.

In the illustration the numbers 7, 2, and 6 are the "givens". They can not be changed. You fill in the remaining numbers as shown in black to complete the column.

Regions

4 5 1
6 9 7
3 2 8

A region is a 3x3 box like the one shown to the left. There are 9 regions in a traditional Sudoku puzzle.

Like the Sudoku requirements for rows and columns, every region must also contain the numbers 1, 2, 3, 4, 5, 6, 7, 8, and 9. Duplicate numbers are not permitted in any region. Each region will differ from the other regions.

In the illustration the numbers 1, 2, and 8 are the "givens". They can not be changed. Fill in the remaining numbers as shown in black to complete the region.

Valid board example: see 364px-Sudoku-by-L2G-20050714_solution.svg.png

For those who don't know the game, here are some information about rules and how to play Sudoku: http://en.wikipedia.org/wiki/Sudoku and http://www.sudokuessentials.com/
*/

function doneOrNot(board) {

    function verticalSlice(b) {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8]
            .reduce(function (p, c) {
                return p.concat([board.map(function (b) { return b[c]; })]);
            }, []);
    }

    function quadrantRow(ar,x,y){
        return [ar[y][x],ar[y][x+1],ar[y][x+2]];
    }

    function quadrant(ar, x, y) {
        return quadrantRow(ar, x, y)
            .concat(quadrantRow(ar, x, y + 1))
            .concat(quadrantRow(ar, x, y + 2));
    }

    function quadrants(ar) {
        return [0, 1, 2]
            .reduce(function (p, x) {
                return p.concat([quadrant(ar, x * 3, 0), quadrant(ar, x * 3, 3), quadrant(ar, x * 3, 6)]);
            }, []);
    }

    return board
        .concat(verticalSlice(board))
        .concat(quadrants(board))
        .map(function (x) { return x.sort(); })
        .map(function (x) { return x.join() == "1,2,3,4,5,6,7,8,9" ? 0 : 1 })
        .indexOf(1) == -1 ? 'Finished!' : 'Try again!';
}


describe("doneOrNot -", function () {

    it("finished", function () {

        expect(doneOrNot([[5, 3, 4, 6, 7, 8, 9, 1, 2],
                                 [6, 7, 2, 1, 9, 5, 3, 4, 8],
                                 [1, 9, 8, 3, 4, 2, 5, 6, 7],
                                 [8, 5, 9, 7, 6, 1, 4, 2, 3],
                                 [4, 2, 6, 8, 5, 3, 7, 9, 1],
                                 [7, 1, 3, 9, 2, 4, 8, 5, 6],
                                 [9, 6, 1, 5, 3, 7, 2, 8, 4],
                                 [2, 8, 7, 4, 1, 9, 6, 3, 5],
                                 [3, 4, 5, 2, 8, 6, 1, 7, 9]])).toEqual("Finished!");
    });

    it("try again", function () {
        expect(doneOrNot([[5, 3, 4, 6, 7, 8, 9, 1, 2],
                             [6, 7, 2, 1, 9, 0, 3, 4, 9],
                             [1, 0, 0, 3, 4, 2, 5, 6, 0],
                             [8, 5, 9, 7, 6, 1, 0, 2, 0],
                             [4, 2, 6, 8, 5, 3, 7, 9, 1],
                             [7, 1, 3, 9, 2, 4, 8, 5, 6],
                             [9, 0, 1, 5, 3, 7, 2, 1, 4],
                             [2, 8, 7, 4, 1, 9, 6, 3, 5],
                             [3, 0, 0, 4, 8, 1, 1, 7, 9]])).toEqual("Try again!");
    });
});