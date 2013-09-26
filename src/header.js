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
        buffer = new ArrayBuffer(fieldDescLength),
        view = new DataView(buffer),
        headerBuffer = new ArrayBuffer(32),
        headerView = new DataView(headerBuffer),
        // deleted flag
        bytesPerRecord = 1;

    attributes.forEach(writeAttribute);

    function writeAttribute(attr, i) {
        var fieldLength = fieldTypes[attr.type](attr);

        writeName(view, attr.name, i);

        var i32 = i * 32;
        view.setInt8(i32 + 11, attr.type.charCodeAt(0));
        view.setInt8(i32 + 16, fieldLength);

        if (attr.type == 'N') {
            view.setInt8(i32 + 17, attr.scale || 0);
        }

        attr.length = fieldLength;
        bytesPerRecord += fieldLength;
    }

    // end of header
    view.setInt8(fieldDescLength - 1, 13);

    headerView.setUint8(0, 3);
    writeDate(headerView, new Date());
    headerView.setUint32(4, n, true);

    var headerLength = fieldDescLength + 31 + 1;
    headerView.setUint16(8, headerLength, true);
    headerView.setUint16(10, bytesPerRecord, true);

    return {
        recordLength: bytesPerRecord,
        header: headerView,
        field: view
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
