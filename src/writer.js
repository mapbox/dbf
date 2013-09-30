var fs = require('fs'),
    record = require('./record'),
    header = require('./header');

module.exports = function write(fields, data) {
    var headData = header(fields);
    var rowData = record(fields, data, headData.recordLength);
    return combined([
        headData.header,
        headData.field,
        rowData
    ]);
};

function combined(l) {
    var totalLength = l.reduce(function(mem, b) {
        return mem += b.byteLength;
    }, 0),
        buffer = new Buffer(totalLength),
        view = new Uint8Array(totalLength);

    var i = 0;

    l.forEach(function(_) {
        for (var j = 0; j < _.length; j++) {
            buffer[i] = _[i];
            i++;
        }
    });

    return buffer;
}
