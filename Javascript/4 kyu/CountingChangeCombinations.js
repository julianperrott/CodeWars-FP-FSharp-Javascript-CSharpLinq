// "4 kyu","Counting Change Combinations","541af676b589989aed0009e7"

var countChange = function (money, coins) {
    if (coins.length == 0) { return 0; }
    var newcoins = coins.slice(0);
    var coin = newcoins.shift();
    return countChangeForCoin(money, newcoins, coin) + countChange(money, newcoins);
}

var countChangeForCoin = function (money, coins, coin) {
    return Array.apply(null, { length: Math.floor(money / coin) })
        .reduce(function (cnt, cv, index) {
            var moneyLeft = money - (index * coin) - coin;
            return cnt + (moneyLeft == 0 ? 1 : countChange(moneyLeft, coins));
        }, 0);
}

describe("CountingChangeCombinations", function () {

    it("4 made up of [1, 2] = 3", function () {
        expect(countChange(4, [1, 2])).toEqual(3);
    });

    it("10 made up of [5, 2, 3] = 4", function () {
        expect(countChange(10, [5, 2, 3])).toEqual(4);
    });

    it("11 made up of [5, 7] = 0", function () {
        expect(countChange(11, [5, 7])).toEqual(0);
    });
});