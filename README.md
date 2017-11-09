# dbf

[![Build Status](https://travis-ci.org/mapbox/dbf.svg?branch=master)](https://travis-ci.org/mapbox/dbf)

---

## Looking for new maintainers!

This project is currently unmaintained. We'd love to turn it over to a new maintainer. If you're interested, please file an issue!

---

Write [dBase files](https://en.wikipedia.org/wiki/DBase) in pure JavaScript,
in node.js or browsers. Requires [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer)
and [DataView](https://developer.mozilla.org/en-US/docs/Web/API/DataView)
support.

## usage

```
npm install dbf
```

Or just in a browser:

    https://unpkg.com/dbf@latest/dbf.js

Replace `latest` with the latest version if you want to be sure.

## example

in node:

```js
var dbf = require('../'),
    fs = require('fs');

var buf = dbf.structure([
    {foo:'bar',noo:10},
    {foo:'louie'}
]);

fs.writeFileSync('foo.dbf', toBuffer(buf.buffer));

function toBuffer(ab) {
    var buffer = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}
```

## API

### `dbf.structure(array)`

Given an array of objects with string or number attributes, return
a DataView object referencing an ArrayBuffer that contains a full DBF
file structure.

## Specifications

* http://www.clicketyclick.dk/databases/xbase/format/dbf.html#DBF_STRUCT
* http://www.quantdec.com/SYSEN597/GTKAV/section4/chapter_15a.htm
* http://ulisse.elettra.trieste.it/services/doc/dbase/DBFstruct.htm
