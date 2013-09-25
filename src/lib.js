module.exports.lpad = function lpad(str, len, char) {
    while (str.length < len) { str = char + str; } return str;
};

module.exports.rpad = function rpad(str, len, char) {
    while (str.length < len) { str = str + char; } return str;
};

module.exports.writeField = function writeField(fieldLength, numAsString, offset) {
    for (var i = 0; i < fieldLength; i++) {
        dbfDataView.setUint8(offset, numAsString.charCodeAt(i)); offset++;
    }
    return offset;
};
