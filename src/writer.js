var record = require('./record'),
    header = require('./header');

module.exports = function write(fields, data) {
    var head = header(fields),
        row = record(fields, data, head.recordLength);

    return combine(combine(head.header, head.field), row);
};

function combine(a, b) {
    var c = new ArrayBuffer(a.byteLength + b.byteLength),
        d = new DataView(c);
    for (var i = 0; i < a.byteLength; i++) {
        d.setUint8(i, a.getUint8(i));
    }
    for (; i < a.byteLength + b.byteLength; i++) {
        d.setUint8(i, b.getUint8(i - a.byteLength));
    }
    return d;
}
