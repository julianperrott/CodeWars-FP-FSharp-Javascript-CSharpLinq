// "5 kyu","Don't Eat the Last Cake!","5384df88aa6fc164bb000e7d"

function Player() { }

// Decide who move first - player or opponent (true if player)
Player.prototype.firstmove = function (cakes) {
    console.log('start =' + cakes);
    if (cakes < 3) { return false; }
    if (cakes < 6) { return true; }
    if (cakes == 6) { return false; }
    if (cakes == 7) { return true; }
    if (cakes == 10) { return false; }
    if (cakes == 11) { return true; }
    if (cakes == 7) { return true; }
    if (cakes == 14) { return false; }
    if (cakes == 15) { return true; }
    if (cakes == 17) { return true; }
    if (cakes == 18) { return false; }
    if (cakes == 19) { return true; }
    if (cakes == 21) { return true; }
    if (cakes == 22) { return false; }
    if (cakes == 23) { return true; }
    return (cakes - 3) % 4 > 0;
}

var mv = function (cakes, last) {

    if (cakes < 3) { return cakes; } // I lost
    if (cakes == 3) { return 2; } // leaves 1
    if (cakes == 4) { return last != 3 ? 3 : 2; } // leaves 1
    if (cakes == 5) { return last != 3 ? 3 : 2; } // leave 2, turn skip if opponent choose 1
    if (cakes == 7) { return 1; } // leave 6, 
    if (cakes == 8) { return last != 2 ? 2 : 1; } // leave 6, I will end up on 4 or 5
    if (cakes == 9) { return last != 3 ? 3 : 1; } // leave 6, 
    if (cakes == 10) { return last != 3 ? 3 : 2; } // lost
    if (cakes == 11) { return last != 1 ? 1 : 2; }
    if (cakes == 13) { return last != 3 ? 3 : 1; }
    if (cakes == 14) { return last != 3 ? 3 : 2; }
    if (cakes == 15) { return 1; }
    if (cakes == 17) { return last != 3 ? 3 : 2; }
    if (cakes == 19) { return last != 1 ? 1 : 3; }
    if (cakes == 21) { return last != 3 ? 3 : 1; }
    if (cakes == 23) { return last != 1 ? 1 : 2; }

    var distance = (cakes - 3) % 4; // distance to 3 + (n*4)
    if (distance != last) { return distance; }
    if (3 != last) { return 3; }
    return 1 == last ? 2 : 1;
}

// Decide your next move
Player.prototype.move = function (cakes, last) {
    var result = mv(cakes, last);
    console.log('move @ ' + cakes + ' ate ' + result);
    return result;

};

// Example function, real one has much better AI ...
function Game(n, debug) {
    function sample(arr) {
        return arr[Math.floor(arr.length * Math.random())];
    }
    function plural(x) {
        if (x == 1) return x + " cake";
        else return x + " cakes";
    }
    var cakes = n | 0;
    if (cakes <= 0) throw new RangeError("At least one cake required");
    var player = new Player(cakes);
    var first = player.firstmove(cakes);
    var last = 0;
    if (debug) console.log(plural(cakes) + " on the table. You decided to move " + (first ? "first" : "last"));
    // now, let's game begin
    for (; ;) {
        // my move
        if (!first) {
            var allow = [];
            for (var i = 1; i <= 3; i++)
                if (cakes >= i && i !== last)
                    allow.push(i);
            if (!allow.length) throw "Game over: stalemate";
            last = sample(allow);
            cakes -= last;
            if (cakes == 0) {
                if (debug) console.log("Yum! I ate the last cake, you win!");
                return true;
            }
            if (debug) console.log("I ate " + plural(last) + ", " + plural(cakes) + " still left");
        } else first = false;
        // your move
        if (cakes == 1 && last == 1) {
            if (debug) console.log("I lead you to stalemate, so you are winner");
            return true;
        }
        var move = player.move(cakes, last);
        if (move > 4) throw "Error: You are so greedy! Don't try to eat more than 3 cakes.";
        if ([1, 2, 3].indexOf(move) === -1) throw "Error: Illegal move (must be 1, 2 or 3, type Number)";
        if (move == last) throw "Error: You cannot eat the same quantity of cakes as you opponent on previous move";
        if (move > cakes) throw "Error: Don't try to eat more cakes that left on table";
        if (move == cakes) throw "Game over: You ate the last cake!";
        cakes -= move;
        last = move;
        if (debug) console.log("You ate " + plural(move) + ", " + plural(cakes) + " still left");
    }
}

describe("Last Cake - ", function () {
    describe("FirstMove - ", function () {

        it("0", function () { expect(new Player().firstmove(0)).toEqual(false); });
        it("1", function () { expect(new Player().firstmove(1)).toEqual(false); });
        it("2", function () { expect(new Player().firstmove(2)).toEqual(false); });
        it("3", function () { expect(new Player().firstmove(3)).toEqual(true); });
        it("4", function () { expect(new Player().firstmove(4)).toEqual(true); });
        it("5", function () { expect(new Player().firstmove(5)).toEqual(true); });

        it("6", function () { expect(new Player().firstmove(6)).toEqual(false); });
        it("7", function () { expect(new Player().firstmove(7)).toEqual(true); });
        it("8", function () { expect(new Player().firstmove(8)).toEqual(true); });
        it("9", function () { expect(new Player().firstmove(9)).toEqual(true); });

        it("10", function () { expect(new Player().firstmove(10)).toEqual(false); });
        it("11", function () { expect(new Player().firstmove(11)).toEqual(false); });
        it("12", function () { expect(new Player().firstmove(12)).toEqual(true); });
        it("13", function () { expect(new Player().firstmove(13)).toEqual(true); });
        it("14", function () { expect(new Player().firstmove(14)).toEqual(true); });
        it("15", function () { expect(new Player().firstmove(15)).toEqual(false); });
        it("16", function () { expect(new Player().firstmove(16)).toEqual(true); });
        it("17", function () { expect(new Player().firstmove(17)).toEqual(true); });
        it("18", function () { expect(new Player().firstmove(18)).toEqual(true); });
        it("19", function () { expect(new Player().firstmove(19)).toEqual(false); });
        it("20", function () { expect(new Player().firstmove(20)).toEqual(true); });
        it("21", function () { expect(new Player().firstmove(21)).toEqual(true); });
        it("22", function () { expect(new Player().firstmove(22)).toEqual(true); });
        it("23", function () { expect(new Player().firstmove(23)).toEqual(false); });
        it("24", function () { expect(new Player().firstmove(24)).toEqual(true); });
        it("25", function () { expect(new Player().firstmove(25)).toEqual(true); });
        it("26", function () { expect(new Player().firstmove(26)).toEqual(true); });
        it("27", function () { expect(new Player().firstmove(27)).toEqual(false); });
        it("28", function () { expect(new Player().firstmove(28)).toEqual(true); });
        it("29", function () { expect(new Player().firstmove(29)).toEqual(true); });
        it("30", function () { expect(new Player().firstmove(30)).toEqual(true); });
        it("31", function () { expect(new Player().firstmove(31)).toEqual(false); });

    });

    describe("Game - ", function () {
        it("5", function () {
            expect(Game(5, true)).toEqual(true);
        });

        it("7", function () {
            expect(Game(7, true)).toEqual(true);
        });

        it("12", function () {
            expect(Game(12, true)).toEqual(true);
        });

        it("23", function () {
            expect(Game(23, true)).toEqual(true);
        });
    });
});
