# csv-xlsx-to-json
Processes csv and xlsx and convert them to json

introduction
------------
Utilizes [xlsx-to-json](https://www.npmjs.com/package/xlsx-to-json) module by [chilijung](https://www.npmjs.com/~chilijung) and [csv-stream](https://www.npmjs.com/package/csv-stream) module by [lbdremy](https://www.npmjs.com/~lbdremy) to provide one simple to use package for converting xlsx and csv documents to json.

Getting Started
--------
Watch for attachments:

```javascript
var sheetToJson = require('csv-xlsx-to-json');


var filePath = "some/file/path/file.csv";

sheetToJson.process(filePath, function(err, result){
    if(err){
        //handle err
    }

    //do something with your json result

})


```




installation
------------

    $ npm install csv-xlsx-to-json


Dependencies
============

This module uses [xlsx-to-json](https://www.npmjs.com/package/xlsx-to-json) and [csv-stream](https://www.npmjs.com/package/csv-stream). For more robust individual features use these modules instead.
