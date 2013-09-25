var fs = require('fs'),
    record = require('./record'),
    header = require('./header');

module.exports = function write(fields, data) {
    var headData = header(fields);
    var rowData = record(fields, data, headData.recordLength);
    var out = fs.createWriteStream('foo.dbf');
    fs.writeFileSync('foo.dbf', Buffer.concat([
        toBuffer(headData.header),
        toBuffer(headData.field),
        toBuffer(rowData)
    ]));
};

function toBuffer(ab) {
    var buffer = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}
