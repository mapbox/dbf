var dbf = require('./');

dbf.writer([
    {
        type: 'C',
        name: 'foo'
    }
], [
    {
        foo: 'bar'
    }
]);
