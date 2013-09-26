var dbf = require('./'),
    fs = require('fs');

fs.writeFileSync('foo.dbf', toBuffer(dbf.writer([
    {
        type: 'C',
        name: 'foo'
    }
], [
    {
        foo: 'bar'
    }
])));

function toBuffer(ab) {
    var buffer = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}
