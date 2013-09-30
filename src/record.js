var lib = require('./lib');

module.exports = function record(attributes, rows, recordLength) {

    var dataLength = (recordLength) * rows.length + 1,
        buffer = new ArrayBuffer(dataLength),
        view = new DataView(buffer),
        offset = 0;

    rows.forEach(function(row, num) {
        view.setUint8(offset, 32);
        offset += 1;
        offset = writeRow(row, offset, num);
    });

    function writeRow(row, offset, num) {
        attributes.forEach(writeAttribute);

        function writeAttribute(attribute) {
            var dataType = attribute.type || 'C',
                fieldLength = attribute.length || 0,
                val = row[attribute.name] || num.toString(),
                str;

            switch (dataType) {
                case 'L':
                    view.setUint8(offset, val ? 84 : 70);
                    offset += 1;
                    break;

                case 'D':
                    offset = lib.writeField(view, 8,
                        lib.lpad(val.toString(), 8, ' '),
                        offset);
                    break;

                case 'N':
                    offset = lib.writeField(view, fieldLength,
                        lib.lpad(val.toString(), fieldLength, ' ').substr(0, 18),
                        offset);
                    break;

                case 'C':
                case '':
                    offset = lib.writeField(view, fieldLength,
                        lib.rpad(val.toString(), fieldLength, ' '), offset);
            }
        }

        return offset;
    }

    view.setUint8(dataLength - 1, 26);

    return buffer;
};
