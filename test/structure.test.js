var test = require('tap').test,
    structure = require('../src/structure');


const MAX_FIELD_NAME_LENGTH = 10

test('structure', function(t) {
    var dat = structure([{ foo: 'bar' }]);
    t.ok(dat);

    testFieldName = (fieldName) => {
        inputData = {};
        inputData[fieldName] = 'bar';
        var dat = structure([inputData]);
        var dataLength = Math.min(MAX_FIELD_NAME_LENGTH, fieldName.length);
        for (i = 0; i < dataLength; i++) {
            if (fieldName[i].charCodeAt(0) !== dat.getUint8(32+i)) {
                t.fail("field name is not equal");
            }
         }

        t.ok(dat);
    }

    testFieldName('foo');
    testFieldName('this_field_name_will_get_truncated_but_silently_passses');
    
    t.end();
});
