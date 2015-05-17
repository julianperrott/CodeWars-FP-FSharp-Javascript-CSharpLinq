// "3 kyu","Molecule to atoms","52f831fa9d332c6591000511"

function parseMolecule(formula) {

    var modulecule = {};

    splitMolecule(formula, 0).map(function (element) {
        var name = Object.keys(element)[0]
        modulecule[name] = (modulecule[name] == undefined ? 0 : modulecule[name]) + element[name];
    });

    return modulecule;
};

elements = ["Ac","Al","Am","Sb","Ar","As","At","Ba","Bk","Be","Bi","Bh","B","Br","Cd","Cs","Ca","Cf","C","Ce","Cl","Cr","Co","Cn","Cu","Cm","Ds","Db","Dy","Es","Er","Eu","Fm","Fl","F","Fr","Gd","Ga","Ge","Au","Hf","Hs","He","Ho","H","In","I","Ir","Fe","Kr","La","Lr","Pb","Li","Lv","Lu","Mg","Mn","Mt","Md","Hg","Mo","Nd","Ne","Np","Ni","Nb","N","No","Os","O","Pd","P","Pt","Pu","Po","K","Pr","Pm","Pa","Ra","Rn","Re","Rh","Rg","Rb","Ru","Rf","Sm","Sc","Sg","Se","Si","Ag","Na","Sr","S","Ta","Tc","Te","Tb","Tl","Th","Tm","Sn","Ti","W","Uuo","Uup","Uus","Uut","U","V","Xe","Yb","Y","Zn","Zr"];

function elementAtIndex(formula, index) {

    var form = formula.substring(index, formula.length);

    var elementFound = elements
        .filter(function (value) { return form.indexOf(value) === 0; })
        .sort(function (a, b) { return a.length < b.length ? 1 : -1; });

    return elementFound.length == 0 ? "" : elementFound[0];
};

function numberAtIndex(formula, index) {
    if (formula.length <= index) { return ""; }
    var digit = "0123456789".split("").indexOf(formula.charAt(index));
    return digit == -1 ? "" : digit.toString() + numberAtIndex(formula, index + 1)
};

function extractSubString(formula, index, stChar, enChar) {
    if (formula.charAt(index) != stChar) { return ""; }

    var ss = formula.substring(index, formula.length);

    var end = ss.indexOf(enChar);

    if (end == -1) {
        throw "mismatched brackets";
    }

    return formula.substring(index, index + end + 1);
};

function splitMolecule(formula,index)
{
    if (index == formula.length) { return [];}

    var element = elementAtIndex(formula, index);

    if (element) {
        var count = numberAtIndex(formula, index + element.length);
        var cnt = count == "" ? 1 : parseInt(count);
        var el = {};
        el[element] = cnt;
        return [el].concat(splitMolecule(formula, index + element.length + count.length));
    }

    var sub = extractSubString(formula, index, "(", ")")
        + extractSubString(formula, index, "[", "]")
        + extractSubString(formula, index, "{", "}");

    if (sub) {
        var count = numberAtIndex(formula, index + sub.length);
        var cnt = count == "" ? 1 : parseInt(count);

        var children = splitMolecule(sub.substring(1, sub.length - 1), 0)
            .map(function (element) {
                var el = {};
                var name = Object.keys(element)[0]
                el[name] = element[name] * cnt;
                return el;
            });

        return children.concat(splitMolecule(formula, index + sub.length + count.length));
    }
    
    throw "Invalid molecule";
};

//{K: 4, O: 14, N: 2, S: 4}),

/*
readMolecule
[ (string,Int) ]

until end
*/

describe("tests ", function () {

    describe("elementAtIndex - ", function () {
        it("He1234,0", function () { expect(elementAtIndex("He1234", 0)).toEqual("He"); });
        it("Mg1234,0", function () { expect(elementAtIndex("Mg1234", 0)).toEqual("Mg"); });
        it("H2SO4,0", function () { expect(elementAtIndex("H2SO4", 0)).toEqual("H"); });
        it("x232,0", function () { expect(elementAtIndex("x232", 0)).toEqual(""); });
        it("H2SO4,1", function () { expect(elementAtIndex("H2SO4", 1)).toEqual(""); });
        it("H2SO4,2", function () { expect(elementAtIndex("H2SO4", 2)).toEqual("S"); });
        it("H2SO4,3", function () { expect(elementAtIndex("H2SO4", 3)).toEqual("O"); });
        it("H2SO4,4", function () { expect(elementAtIndex("H2SO4", 4)).toEqual(""); });
        it("Co2", function () { expect(elementAtIndex("Co2", 0)).toEqual("Co"); });
    });

    describe("numberAtIndex - ", function () {
        it("1a", function () { expect(numberAtIndex("1a", 0)).toEqual("1"); });
        it("23a", function () { expect(numberAtIndex("23a", 0)).toEqual("23"); });
        it("a4", function () { expect(numberAtIndex("a4", 0)).toEqual(""); });
    });

    describe("extractSubString - ", function () {
        var str = "He2{Be4}4Cu5";

        it(str + " 0", function () { expect(extractSubString(str, 3, "{", "}")).toEqual("{Be4}"); });
        it(str + " 4", function () { expect(extractSubString(str, 4, "{", "}")).toEqual(""); });
        it(str + " 7", function () { expect(extractSubString(str, 7, "{", "}")).toEqual(""); });
        it(str + " 8", function () { expect(extractSubString(str, 8, "{", "}")).toEqual(""); });
    });

    describe("splitMolecule - ", function () {

        var weirdMolecule = "He2{Be4C5[BCo3(CO2)3]2}4Cu5";
        var moleculeWithOneBracket = "He2{Be4}4Cu5";
        var simpleMolecule = "He2Be4C5BCo3CO2Cu5";

        it(simpleMolecule, function () {
            expect(splitMolecule(simpleMolecule, 0)).toEqual([{ He: 2 }, { Be: 4 }, { C: 5 }, { B: 1 }, { Co: 3 }, { C: 1 }, { O: 2 }, { Cu: 5}]);
        });

        it(moleculeWithOneBracket, function () {
            expect(splitMolecule(moleculeWithOneBracket, 0)).toEqual([{ He: 2 }, { Be: 16 }, { Cu: 5 }]);
        });

        it(weirdMolecule, function () {
            expect(splitMolecule(weirdMolecule, 0)).toEqual([{ He: 2 }, { Be: 16 }, ({ C: 20 }, { B: 8 }, { Co: 24 }, { C: 24 }, { O: 48 }, { Cu: 5 })]);
        });
    });

    describe("parseMolecule - ", function () {

        var weirdMolecule = "He2{Be4C5[BCo3(CO2)3]2}4Cu5";

        it(weirdMolecule, function () {
            expect(parseMolecule(weirdMolecule, 0)).toEqual({ He: 2, Be: 16, C: 44, B: 8, Co: 24, O: 48, Cu: 5 });
        });

    });
});