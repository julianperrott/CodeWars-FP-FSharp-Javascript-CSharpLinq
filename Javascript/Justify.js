var justify = function (str, len) {
    var result = '';
    var lastLine = str.trim()
        .split(' ')
        .reduce(function (line, word) {
            if ((line + ' ' + word).length > len) {
                result += (result.length > 0 ? '\n' : '') + justifyLine(line.trim(), len);
                return word;
            }
            return line + ' ' + word;
        });

    return result += (result ? '\n' : '') + lastLine;
};

function justifyLine(line, len) {
    var words = line.split(' ');
    if (words.length == 1) { return line; }

    var gaps = words.length - 1;
    var spacesRequired = len + gaps - line.length;

    return words.reduce(function (pv, cv, i) {
        var sp = '            '.substr(0, parseInt(spacesRequired / gaps) + (i - 1 < spacesRequired % gaps ? 1 : 0));
        return pv + sp + cv;
    });
}

describe("Justify Line - ", function () {

    it("lorem ipsum 15", function () {
        expect(justifyLine('lorem ipsum', 15)).toEqual('lorem     ipsum');
    });
});

describe("Justify - ", function () {

    var mary = "mary had a little lamb its fleece was white as snow";
    var lorus = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.";

    it("Mary 20", function () {
        expect(justify(mary, 20)).toEqual("mary  had  a  little\nlamb  its fleece was\nwhite as snow");
    });

    it("lorus 15", function () {
        var result = justify(lorus, 15);
        var lines = result.split('\n');

        // check all lines are 15 chars long apart from the last one

        lines.filter(function (line) { return line.indexOf(" ") > -1; })
            .forEach(function (line) {
                if (line.length != 15) {
                    expect(line).toEqual(15);
                }
            });

    });

});