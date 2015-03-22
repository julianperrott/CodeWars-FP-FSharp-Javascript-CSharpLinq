describe("ArrayComprehension tests", function () {

    it("Empty list test", function () {
        var list = ArrayComprehension({ generator: '' });
        expect(list, []);
        expect(ArrayComprehension({})).toEqual([]);
        expect(ArrayComprehension({ generator: '    ' })).toEqual([]);
    });

    it("One element test", function () {
        var list = ArrayComprehension({ generator: '1' });
        expect(list).toEqual([1]);
    });

    it("Two elements test 1,4", function () {
        expect(ArrayComprehension({ generator: '1,4' })).toEqual([1, 4]);
    });

    it("Two elements test 1   ,    4", function () {
        expect(ArrayComprehension({ generator: ' 1   ,  4  ' })).toEqual([1, 4]);
    });

    it("Multiple elements test", function () {
        expect(ArrayComprehension({ generator: '1,4,6,3,-2' })).toEqual([1, 4, 6, 3, -2]);
    });

    it("Range tests 1,3..4", function () {
        expect(ArrayComprehension({ generator: '1,3..4' })).toEqual([1, 3]);
    });

    it("Range tests 1,2..2", function () {
        expect(ArrayComprehension({ generator: '1,2..2' })).toEqual([1, 2]);
    });

    it("Range tests 3,2..2", function () {
        expect(ArrayComprehension({ generator: '3,2..2' })).toEqual([3, 2]);
    });

    it("Range tests 5..3", function () {
        expect(ArrayComprehension({ generator: '5..3' })).toEqual([]);
    });

    it("Range tests 90..80", function () {
        expect(ArrayComprehension({ generator: '90..80' })).toEqual([]);
    });

    it("Range tests 8,4..40", function () {
        expect(ArrayComprehension({ generator: '8,4..40' })).toEqual([8]);
    });

    it("Range tests 1,90..80", function () {
        expect(ArrayComprehension({ generator: '1,90..80' })).toEqual([1]);
    });

    it("Range tests 1..5", function () {
        expect(ArrayComprehension({ generator: '1..5' })).toEqual([1, 2, 3, 4, 5]);
    });

    it("Range tests 1,4..12", function () {
        expect(ArrayComprehension({ generator: '1,4..12' })).toEqual([1, 4, 7, 10]);
    });

    it("Range tests 12,10..4", function () {
        expect(ArrayComprehension({ generator: '12,10..4' })).toEqual([12, 10, 8, 6, 4]);
    });


    it("[2,3,-5,3]", function () {
        expect(ArrayComprehension({ generator: '2,3,-5,3' })).toEqual([2, 3, -5, 3]); // just like in JavaScript : [2,3,-5,3]
    });
    it("[1..5]", function () {
        expect(ArrayComprehension({ generator: '1..5' })).toEqual([1, 2, 3, 4, 5]); // goes forward with step 1 : [1,2,3,4,5]
    });
    it("[1,3..7]", function () {
        expect(ArrayComprehension({ generator: '1,3..7' })).toEqual([1, 3, 5, 7]); // goes forward with step 2 (3 - 1) : [1,3,5,7]
    });
    it("[6,5..3]", function () {
        expect(ArrayComprehension({ generator: '6,5..3' })).toEqual([6, 5, 4, 3]); // goes back with step -1 = (5 - 6) : [6,5,4,3]
    });
    it("[6,4..0]", function () {
        expect(ArrayComprehension({ generator: '6,4..0' })).toEqual([6, 4, 2, 0]); // goes back with step -2 = (4 -6) : [6, 4, 2, 0]
    });
    it("[5..3]", function () {
        expect(ArrayComprehension({ generator: '5..3' })).toEqual([]); // default step is 1 while the range is decreasing : []
    });
    it("[10,1..10]", function () {
        expect(ArrayComprehension({ generator: '10,1..10' })).toEqual([10]); // goes back with step -9 for an increasing range : [10]
    });
    it("[1,1..10]", function () {
        expect(ArrayComprehension({ generator: '1,1..10' })).toEqual([]); // goes forwaed with step is 0 = ( 1 - 1) : infitite list [1,1,...]. Do not worry about this case in this kata for this, we will deal with it in the third part.
    });
    it("[1..9,12..15]", function () {
        expect(ArrayComprehension({ generator: '1..9,12..15' })).toEqual([]); // invalid since one single range is allowed
    });
    it("[1,2..20,25]", function () {
        expect(ArrayComprehension({ generator: '1,2..20,25' })).toEqual([]); // invalid since a range has to be the final item
    });
    it("[1,2,3..20]", function () {
        expect(ArrayComprehension({ generator: '1,2,3..20' })).toEqual([]); // invalid since at most one inidivual element can be provided before a range
    });
});