var dbf = require('./'),
    fs = require('fs');

var buf = dbf.structure([
    {foo:'bar',noo:10},
    {foo:'louie'},
    {baz:new Date()}
]);

fs.writeFileSync('foo.dbf', toBuffer(buf.buffer));

function toBuffer(ab) {
    var buffer = Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}
