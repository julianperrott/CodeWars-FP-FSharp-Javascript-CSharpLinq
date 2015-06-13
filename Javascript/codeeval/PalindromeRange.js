function isPalindrome(v) {
    var v2 = v;
    var j = 0;
    while (v2 > 0)
    {
        var r = v2 % 10;
        j=(j*10)+r;
        v2 = (v2-r) / 10;
    }

    return j == v;
}
84.177

function palindromeRange(line) {
    var args = line.split(" ");
    var L = parseInt(args[0]);
    var R = parseInt(args[1]);
    var res = 0;


    var pals = [];
    for (var i = L; i <= R; i++) // range start L<-i->R
    {
        pals.push(isPalindrome(i) ? 1 : 0);
    }

    for (var i = L; i <= R; i++) // range start L<-i->R
    {
        for (var j = i; j <= R; j++) // range end i--R
        {
            var sum = 0;

           
                
            for (var k = i; k <= j; k++) // count palindromes in range
            {
                sum += pals[k - L];
            }

            console.log(i + "," + j+" = "+sum+" .... "+sum%2);

            if (sum % 2 == 0) {
                ++res;
            }
        }
    }
    console.log(res);
    return res;
};

describe("isPalindrome", function () {
    it("1", function () { expect(isPalindrome("1")).toEqual(true); });
    it("123", function () { expect(isPalindrome("123")).toEqual(false); });
    it("88", function () { expect(isPalindrome("88")).toEqual(true); });
    it("1221", function () { expect(isPalindrome("1221")).toEqual(true); });
    it("181", function () { expect(isPalindrome("181")).toEqual(true); });
    it("180", function () { expect(isPalindrome("180")).toEqual(false); });
});

describe("palindromeRange", function () {
    it("s1", function () { expect(palindromeRange("1 7")).toEqual(12); });
    it("s2", function () { expect(palindromeRange("207 228")).toEqual(123); });
    it("s3", function () { expect(palindromeRange("141 158")).toEqual(81); });
    it("s4", function () { expect(palindromeRange("242 265")).toEqual(146); });
    it("s5", function () { expect(palindromeRange("262 280")).toEqual(90); });
    it("s6", function () { expect(palindromeRange("87 93")).toEqual(16); });
    it("s7", function () { expect(palindromeRange("1 2")).toEqual(1); });
    it("s8", function () { expect(palindromeRange("229 246")).toEqual(81); });
    it("s9", function () { expect(palindromeRange("270 294")).toEqual(156); });
    it("s10", function () { expect(palindromeRange("163 182")).toEqual(100); });
    it("s11", function () { expect(palindromeRange("167 183")).toEqual(73); });
    it("s12", function () { expect(palindromeRange("51 63")).toEqual(46); });
    it("s13", function () { expect(palindromeRange("73 92")).toEqual(100); });
    it("s14", function () { expect(palindromeRange("15 36")).toEqual(121); });
    it("s15", function () { expect(palindromeRange("178 196")).toEqual(90); });
    it("s16", function () { expect(palindromeRange("166 180")).toEqual(60); });
    it("s17", function () { expect(palindromeRange("90 97")).toEqual(36); });
    it("s18", function () { expect(palindromeRange("90 99")).toEqual(45); });
    it("s19", function () { expect(palindromeRange("113 134")).toEqual(123); });
    it("s20", function () { expect(palindromeRange("68 78")).toEqual(46); });
});