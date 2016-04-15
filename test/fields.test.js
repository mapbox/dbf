var test = require('tap').test,
    fields = require('../src/fields');

test('fields.multi', function(t) {
    var data = [{
        field1: 'val1',
        field2: 'val2',
        field3: 'val3'
    }, {
        field1: 'val5'
    }, {
        field2: null,
        field5: null
    }, {
        field4: 'val4',
        field1: undefined,
        field5: null
    }];
    var result = fields.multi(data);
    function byName(name) {
      return result.filter(function(f) { return f.name === name});
    };
    t.ok(byName('field1').length, 'field1 not in fields');
    t.equal(byName('field1')[0].type, 'C', 'wrong type for field1');
    t.ok(byName('field2').length, 'field2 not in fields');
    t.equal(byName('field2')[0].type, 'C', 'wrong type for field2');
    t.ok(byName('field3').length, 'field3 not in fields');
    t.equal(byName('field3')[0].type, 'C', 'wrong type for field3');
    t.ok(byName('field4').length, 'field4 not in fields');
    t.equal(byName('field4')[0].type, 'C', 'wrong type for field4');
    t.ok(byName('field5').length, 'field5 not in fields');
    t.end();
});
