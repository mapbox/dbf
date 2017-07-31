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

module.exports.rpadbuf = function rpad(buf, len, char) {
  var buffer = Buffer.alloc(len, char);
  buf.copy(buffer);
  return buffer;
};


/**
 * @param {object} view
 * @param {number} fieldLength
 * @param {string} str
 * @param {number} offset
 * @returns {number}
 */
module.exports.writeField = function writeField(view, fieldLength, buf, offset) {
  for (var i = 0; i < fieldLength; i++) {
    view.setUint8(offset, buf[i]);
    offset++;
  };
  return offset;
};
