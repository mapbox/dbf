/**
 * @param {string} str
 * @param {number} len
 * @param {string} char
 * @returns {string}
 */
module.exports.lpad = function lpad(str, len, char) {
    while (str.length < len) { str = char + str; } return str;
};

/**
 * @param {string} str
 * @param {number} len
 * @param {string} char
 * @returns {string}
 */
module.exports.rpad = function rpad(str, len, char) {
    while (str.length < len) { str = str + char; } return str;
};

/**
 * @param {object} view
 * @param {number} fieldLength
 * @param {string} str
 * @param {number} offset
 * @returns {number}
 */
module.exports.writeField = function writeField(view, fieldLength, str, offset) {
    var buffer = toBuffer(str);
    for (var i = 0; i < fieldLength; i++) {
        view.setUint8(offset, buffer[i]); offset++;
    }
    return offset;
};

/**
 * @param {string} str
 * @returns {object}
 */
function toBuffer(str) {
    if (typeof TextEncoder === "function") {
        var encoder = new TextEncoder();
        return encoder.encode(str);
    }

    var buffer = new Uint16Array(str.length);
    for (var i = 0; i < str.length; i++) {
        buffer[i] = str.charCodeAt(i);
    }

    return buffer;
}

module.exports.toBuffer = toBuffer;
