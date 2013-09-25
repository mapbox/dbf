module.exports = function record(attributeMap, rows, dbfRecordLength) {

    var dataLength = (dbfRecordLength) * rows.length + 1,
        dbfDataBuf = new ArrayBuffer(dataLength),
        dbfDataView = new DataView(dbfDataBuf),
        currentOffset = 0;

    rows.forEach(function(rowData) {

        var recordStartOffset = rownum * (dbfRecordLength);

        // Deletion flag: not deleted. 20h = 32, space
        dbfDataView.setUint8(currentOffset, 32);
        currentOffset += 1;

        for (var attribNum = 0; attribNum < attributeMap.length; attribNum++) {

            var attribInfo = attributeMap[attribNum],
                attName = attribInfo.name,
                dataType = attribInfo.type || 'C',
                fieldLength = attribInfo.length || 0,
                attValue = rowData[attName] || rownum.toString(),
                writeByte,
                numAsString;

            switch (dataType) {
                case 'L':
                    fieldLength = 1;
                    // T/F
                    if (attValue)  dbfDataView.setUint8(currentOffset, 84);
                    else dbfDataView.setUint8(currentOffset, 70);
                    currentOffset += 1;
                    break;

                case 'D':
                    fieldLength = 8;
                    numAsString = attValue.toString();
                    if (numAsString.length != fieldLength) {
                        // if the length isn't what it should be then ignore and write a blank string
                        numAsString = "".lpad(" ", 8);
                    }
                    currentOffset = writeField(fieldLength, numAsString, currentOffset);
                    break;

                case 'N':
                    // maximum length is 18. Numbers are stored as ascii text so convert to a string.
                    // fieldLength = attribinfo.length && attribinfo.length<19 ? attribinfo.length : 18;
                    numAsString = attValue.toString();
                    if (fieldLength === 0) {
                        continue;
                    }
                    // bug fix: was calling lpad on != fieldLength i.e. for too-long strings too
                    if (numAsString.length < fieldLength) {
                        // if the length is too short then pad to the left
                        numAsString = numAsString.lpad(" ", fieldLength);
                    } else if (numAsString.length > fieldLength){
                        numAsString = numAsString.substr(0,18);
                    }
                    currentOffset = writeField(fieldLength, numAsString, currentOffset);
                    break;

                case 'C':
                case '':
                    if (fieldLength === 0) return;
                    if (typeof(attValue) !== "string") {
                        // just in case a rogue number has got in...
                        attValue = attValue.toString();
                    }
                    if (attValue.length < fieldLength) {
                        attValue = attValue.rpad(" ", fieldLength);
                    }
                    currentOffset = writeField(fieldLength, numAsString, currentOffset);
            }
        }
    });

    dbfDataView.setUint8(dataLength - 1, 26);

    return dbfDataBuf;
};

function writeField(fieldLength, numAsString, currentOffset) {
    for (var i = 0; i < fieldLength; i++) {
        dbfDataView.setUint8(currentOffset, numAsString.charCodeAt(i));
        currentOffset++;
    }
    return currentOffset;
}
