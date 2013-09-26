# dbf

Create [DBF](http://en.wikipedia.org/wiki/DBASE) database files in pure
JavaScript.

DBF is a zombie file format kept alive by inclusion in the [Shapefile](http://en.wikipedia.org/wiki/Shapefile)
file format.

## usage

    npm install dbf
    npm test

### api

`arraybuffer = dbf.writer(fields, data)`

Fields as objects with

* type: one of
  * C: String
  * L: Bool
  * D: Date
  * N, M, F, B: Number
* name: column name

And data is an array of objects that represent rows.

Returns an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer)
of binary data.

### example

```js
var dbf = require('dbf');

dbf.writer([{
    type: 'C',
    name: 'foo'
}], [{
    foo: 'bar'
}]);
```

### specs

* http://www.clicketyclick.dk/databases/xbase/format/dbf.html#DBF_STRUCT
* http://www.quantdec.com/SYSEN597/GTKAV/section4/chapter_15a.htm
* http://ulisse.elettra.trieste.it/services/doc/dbase/DBFstruct.htm
