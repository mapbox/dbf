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
    for (var i = 0; i < fieldLength; i++) {
        view.setUint8(offset, str.charCodeAt(i)); offset++;
    }
    return offset;
};

module.exports.writeDate = function(date) {
    if(!date || isNaN(date.getTime())) return "        ";
    return ("0000"+date.getFullYear()).slice(-4) + ("00"+(date.getMonth()+1)).slice(-2) + ("00"+date.getDate()).slice(-2);
};
