module.exports = function header(attributes, n) {

    var fieldDescLength = 32 * attributes.length + 1,
        dbfFieldDescBuf = new ArrayBuffer(fieldDescLength),
        dbfFieldDescView = new DataView(dbfFieldDescBuf),
        numBytesPerRecord = 1;

    attributes.forEach(function(attr, i) {
        var name = attr.name.slice(0, 10),
            datatype = attr.type || 'C',
            fieldLength;

        // write the name into bytes 0-9 of the field description
        for (var x = 0; x < name.length; x++) {
            dbfFieldDescView.setInt8(i * 32 + x, name.charCodeAt(x));
        }

        switch (datatype) {
            case 'L':
                fieldLength = 1;
                break;
            case 'D':
                fieldLength = 8;
                break;
            case 'N':
                fieldLength = attr.length && attr.length < 19 ?
                    attr.length : 18;
                break;
            case 'C':
                fieldLength = attr.length && attr.length < 254 ?
                    attr.length : 254;
                break;
        }

        dbfFieldDescView.setInt8(i * 32 + 11, datatype.charCodeAt(0));
        dbfFieldDescView.setInt8(i * 32 + 16, fieldLength);

        if (datatype == 'N') {
            dbfFieldDescView.setInt8(i * 32 + 17, attr.scale || 0);
        }

        // modify what's recorded so the attribute map doesn't have more than
        // 18 chars even if there are more
        // than 18 present
        attr.length = fieldLength;
        numBytesPerRecord += fieldLength;
    });

    // mark end of header
    dbfFieldDescView.setInt8(fieldDescLength - 1, 13);

    // field map section is complete, now do the main header
    var dbfHeaderBuf = new ArrayBuffer(32),
        dbfHeaderView = new DataView(dbfHeaderBuf);

    dbfHeaderView.setUint8(0, 3);

    var now = new Date();
    dbfHeaderView.setUint8(1, now.getFullYear() - 1900);
    dbfHeaderView.setUint8(2, now.getMonth());
    dbfHeaderView.setUint8(3, now.getDate());

    dbfHeaderView.setUint32(4, n, true);

    var totalHeaderLength = fieldDescLength + 31 + 1;
    dbfHeaderView.setUint16(8, totalHeaderLength, true);
    dbfHeaderView.setUint16(10, numBytesPerRecord, true);

    // var dbfHeaderBlob = new BlobBuilder();
    // dbfHeaderBlob.append(dbfHeaderView.getBuffer());
    // dbfHeaderBlob.append(dbfFieldDescView.getBuffer());

    return {
        recordLength: numBytesPerRecord,
        header: dbfHeaderBuf,
        field: dbfFieldDescBuf
    };
};
