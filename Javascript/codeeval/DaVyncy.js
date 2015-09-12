"use strict";
/* https://www.codeeval.com/open_challenges/77/

Da Vyncy

Challenge Description:
 
You were reading The Da Vyncy Code, the translation of a famous murder mystery novel into Python. The Code is finally revealed on the last page. You had reached the second to last page of the novel, and then you went to take a bathroom break. 

While you were in the bathroom, the Illuminati snuck into your room and shredded the last page of your book. You had 9 backup copies of the book just in case of an attack like this, but the Illuminati shredded the last page from each of the those books, too. Then they propped up a fan, aimed it at the remains, and turned it on at high-speed. 

 The last page of your book is now in tatters. 

 However, there are many text fragments floating in the air. You enlist an undergraduate student for a 'summer research project' of typing up these fragments into a file. Your mission: reassemble the last page of your book. 

 Problem Description 
 ============= 

 (adapted from a problem by Julie Zelenski) 

 Write a program that, given a set of fragments (ASCII strings), uses the following method (or a method producing identical output) to reassemble the document from which they came: 

 At each step, your program searches the collection of fragments. It should find the pair of fragments with the maximal overlap match and merge those two fragments. This operation should decrease the total number of fragments by one. If there is more than one pair of fragments with a maximal overlap, you may break the tie in an arbitrary fashion.Fragments must overlap at their start or end. For example: 
- "ABCDEF" and "DEFG" overlap with overlap length 3
- "ABCDEF" and "XYZABC" overlap with overlap length 3
- "ABCDEF" and "BCDE" overlap with overlap length 4
- "ABCDEF" and "XCDEZ" do *not* overlap (they have matching characters in the middle, but the overlap does not extend to the end of either string).

Fear not - any test inputs given to you will satisfy the property that the tie-breaking order will not change the result, as long as you only ever merge maximally-overlapping fragments. Bonus points if you can come up with an input for which this property does not hold (ie, there exists more than 1 different final reconstruction, depending on the order in which different maximal-overlap merges are performed) -- if you find such a case, submit it in the comments to your code! 

 All characters must match exactly in a sequence (case-sensitive). Assume that your undergraduate has provided you with clean data (i.e., there are no typos). 

Input sample:

Your program should accept as its first argument a path to a filename. Each line in this file represents a test case. Each line contains fragments separated by a semicolon, which your assistant has painstakingly transcribed from the shreds left by the Illuminati. You may assume that every fragment has length at least 2 and at most 1022 (excluding the trailing newline, which should *not* be considered part of the fragment). E.g. Here are two test cases. 
O draconia;conian devil! Oh la;h lame sa;saint!
m quaerat voluptatem.;pora incidunt ut labore et d;, consectetur, adipisci velit;olore magnam aliqua;idunt ut labore et dolore magn;uptatem.;i dolorem ipsum qu;iquam quaerat vol;psum quia dolor sit amet, consectetur, a;ia dolor sit amet, conse;squam est, qui do;Neque porro quisquam est, qu;aerat voluptatem.;m eius modi tem;Neque porro qui;, sed quia non numquam ei;lorem ipsum quia dolor sit amet;ctetur, adipisci velit, sed quia non numq;unt ut labore et dolore magnam aliquam qu;dipisci velit, sed quia non numqua;us modi tempora incid;Neque porro quisquam est, qui dolorem i;uam eius modi tem;pora inc;am al

Output sample:

Print out the original document, reassembled. E.g. 
O draconian devil! Oh lame saint!
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

*/

function solve(line) {
    var fragments = line.split(";");

    while (fragments.length > 1) {
        var result = findLongestMatch(fragments);
        if (result == undefined) {
            //assu
            fragments.sort(function (a, b) { return b.length - a.length });
            return fragments[0];
        }

        joinFragments(fragments, result.index, result.targetIndex, result.length);
    }

    return fragments[0];
}

function joinFragments(fragments, ixTo, ixFrom, length) {
    if (overlaps(fragments[ixTo], fragments[ixFrom], length)) {
        fragments[ixTo] = fragments[ixFrom] + fragments[ixTo].substr(length);
    }
    else {
        fragments[ixTo] = fragments[ixTo] + fragments[ixFrom].substr(length);
    }
    fragments.splice(ixFrom, 1);
}

function findLongestMatch(fragments) {
    var longestMatch = { length: 0, targetIndex:-1 };

    for (var fragmentIndex = 0; fragmentIndex < fragments.length - 1; fragmentIndex++) {

        var result = findLongestMatchForIndex(fragments, fragmentIndex, longestMatch.length + 1);

        if (result != undefined) {
            longestMatch = result;
        }
    }

    if (longestMatch.targetIndex==-1) { return undefined;}

    return longestMatch;
}

function findLongestMatchForIndex(fragments, startIndex, minLength) {
    var longestOverlap = minLength;
    var targetIndex =-1;

    for (var index = startIndex + 1; index < fragments.length; index++) {
        var overlap = findLongestOverlap(fragments[startIndex], fragments[index], longestOverlap);
        if (overlap >= longestOverlap) {
            longestOverlap = overlap;
            targetIndex =index;
        }
    }

    if (targetIndex == -1) { return undefined; }
    return { length: longestOverlap, targetIndex: targetIndex, index: startIndex };
}

function findLongestOverlap(item1, item2, minLength) {
    var shortest = item1.length<item2.length ? item1:item2;
    var longestOverlap = -1;

    for (var length = minLength; length <= shortest.length; length++) {
        if (overlaps(item1, item2, length) || overlaps(item2, item1, length)) {
            longestOverlap = length;
        }
    }
    return longestOverlap;
}

function overlaps(item1, item2, length) {
    return item1.substr(0, length) == item2.substr(item2.length - length)
}

describe("joinFragments", function () {
    it("join at start", function ()
    {
        var frag = ["a", "abcdefghi", "b", "xsafabcd", "ghidsded"];
        joinFragments(frag, 1, 3, 4);
        expect(frag.length).toEqual(4);
        expect(frag[1]).toEqual("xsafabcdefghi");
    });
    
    it("join at end", function ()
    {
        var frag = ["a", "abcdefghi", "b", "xsafabcd", "ghidsded"];
        joinFragments(frag, 1, 4, 3);
        expect(frag.length).toEqual(4);
        expect(frag[1]).toEqual("abcdefghidsded");
    });
});

describe("findLongestMatch", function () {
    var ar = ["abcdefghi", "xxxabc", "ghixdsd", "eoipoiabcd", "fgheoipo"];

    it("length", function () { expect(findLongestMatch(ar).length).toEqual(5); });
    it("Index", function () { expect(findLongestMatch(ar).index).toEqual(3); });
    it("targetIndex", function () { expect(findLongestMatch(ar).targetIndex).toEqual(4); });
    
});

describe("findLongestMatchForIndex", function () {
    var ar = ["abcdefghi", "xxxabc", "ghixdsd", "eoipoiabcd", "fghisdsd"];

    it("longer length found", function () { expect(findLongestMatchForIndex(ar, 0, 1).length).toEqual(4); });
    it("new targetIndex found", function () { expect(findLongestMatchForIndex(ar, 0, 1).targetIndex).toEqual(4); });

    it("longer length not found", function () { expect(findLongestMatchForIndex(ar, 0, 5)).toEqual(undefined); });


});

describe("findLongestOverlap", function () {
    it("overlap found bigger than min", function () { expect(findLongestOverlap("abcdef", "xdsabc", 0)).toEqual(3); });
    it("overlap not found bigger than min", function () { expect(findLongestOverlap("abcdef", "xdsabc", 4)).toEqual(-1); });
});

describe("overlaps", function () {
    it("overlaps true", function () { expect(overlaps("abcdef", "xdsabc", 3)).toEqual(true); });
    it("overlaps false", function () { expect(overlaps("abcdef", "xdsabc", 4)).toEqual(false); });
});

describe("solve", function () {
    var simpleSample= "O draconia;conian devil! Oh la;h lame sa;saint!"
    var longSample = "m quaerat voluptatem.;pora incidunt ut labore et d;, consectetur, adipisci velit;olore magnam aliqua;idunt ut labore et dolore magn;uptatem.;i dolorem ipsum qu;iquam quaerat vol;psum quia dolor sit amet, consectetur, a;ia dolor sit amet, conse;squam est, qui do;Neque porro quisquam est, qu;aerat voluptatem.;m eius modi tem;Neque porro qui;, sed quia non numquam ei;lorem ipsum quia dolor sit amet;ctetur, adipisci velit, sed quia non numq;unt ut labore et dolore magnam aliquam qu;dipisci velit, sed quia non numqua;us modi tempora incid;Neque porro quisquam est, qui dolorem i;uam eius modi tem;pora inc;am al";
    it("simpleSample", function () {
        expect(solve(simpleSample)).toEqual("O draconian devil! Oh lame saint!");
    });
    it("longSample", function () {
        expect(solve(longSample)).toEqual("Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.");
    });
});

