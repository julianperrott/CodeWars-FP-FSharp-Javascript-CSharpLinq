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