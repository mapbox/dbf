var fieldTypes = {
    // string
    C: function(attr) { return attr.length || 254; },
    // boolean
    L: functor(1),
    // date
    D: functor(8),
    // number
    N: function(attr) { return attr.length || 18; },
    // number
    M: function(attr) { return attr.length || 18; },
    // number, float
    F: function(attr) { return attr.length || 18; },
    // number
    B: function(attr) { return attr.length || 18; }
};

module.exports = function header(attributes, n) {

    var fieldDescLength = (32 * attributes.length) + 1,
        dbfFieldDescBuf = new ArrayBuffer(fieldDescLength),
        dbfFieldDescView = new DataView(dbfFieldDescBuf),
        // deleted flag
        bytesPerRecord = 1;

    attributes.forEach(function(attr, i) {
        var datatype = attr.type || 'C',
            fieldLength = fieldTypes[datatype](attr);

        writeName(dbfFieldDescView, attr.name, i);

        dbfFieldDescView.setInt8(i * 32 + 11, datatype.charCodeAt(0));
        dbfFieldDescView.setInt8(i * 32 + 16, fieldLength);

        if (datatype == 'N') {
            dbfFieldDescView.setInt8(i * 32 + 17, attr.scale || 0);
        }

        attr.length = fieldLength;
        bytesPerRecord += fieldLength;
    });

    // mark end of header
    dbfFieldDescView.setInt8(fieldDescLength - 1, 13);

    // field map section is complete, now do the main header
    var dbfHeaderBuf = new ArrayBuffer(32),
        dbfHeaderView = new DataView(dbfHeaderBuf);

    dbfHeaderView.setUint8(0, 3);
    writeDate(dbfHeaderView, new Date());
    dbfHeaderView.setUint32(4, n, true);

    var headerLength = fieldDescLength + 31 + 1;
    dbfHeaderView.setUint16(8, headerLength, true);
    dbfHeaderView.setUint16(10, bytesPerRecord, true);

    // var dbfHeaderBlob = new BlobBuilder();
    // dbfHeaderBlob.append(dbfHeaderView.getBuffer());
    // dbfHeaderBlob.append(dbfFieldDescView.getBuffer());

    return {
        recordLength: bytesPerRecord,
        header: dbfHeaderBuf,
        field: dbfFieldDescBuf
    };
};

function writeDate(view, now) {
    view.setUint8(1, now.getFullYear() - 1900);
    view.setUint8(2, now.getMonth());
    view.setUint8(3, now.getDate());
}

function writeName(view, name, i) {
    name.split('').slice(0, 8).forEach(writeChar);
    function writeChar(c, x) {
        view.setInt8(i * 32 + x, c.charCodeAt(0));
    }
}

function functor(_) { return function() { return _; }; }
