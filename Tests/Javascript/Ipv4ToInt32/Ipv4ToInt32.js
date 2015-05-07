function ipToInt32(ip) {
    return ip.split(".").reduce(function (p, c, i) { return p + (c << ((3 - i) * 8)); }, 0) >>> 0;
}

function ToIntArray(ip)
{
    return ip.split(".").map(function (v) { return parseInt(v); });
}

function RightShift(ints)
{
    return ints.map(function (v,i) {
        return v << ((3-i)*8); 
    });
}