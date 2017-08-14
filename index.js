var fs = require('fs'),
    csv = require('csv-stream'),
    xlsx = require('xlsx-to-json');



var csvToJson = function (filePath, callback) {


    var csvStream = csv.createStream();

    var dataSet = {
        data: []
    };
    fs.createReadStream(filePath, {autoClose: true})
        .pipe(csvStream)
        .on('close', function (f) {

            if (!dataSet.data[0].undefined) {
                callback(false, dataSet);
            } else {
                //Standard /r/n failed and is most likely mac csv and require /r
                csvToJsonMac(filePath, function (err, dataSet) {
                    if (err) callback(err, null);

                    callback(false, dataSet);

                })
            }
        })
        .on('error', function (err) {
            callback(err, null);
        })
        .on('data', function (data) {
            if (data) {
                dataSet.data.push(data);
            }
        })

};

var csvToJsonMac = function (filePath, callback) {

    var options = {
        endLine: '\r', // default is \n,
        escapeChar: '"', // default is an empty string
        enclosedChar: '"' // default is an empty string
    };
    var csvStream = csv.createStream(options);

    var dataSet = {
        data: [],
        timeStamp: 0
    };

    fs.createReadStream(filePath, {autoClose: true})
        .pipe(csvStream)
        .on('close', function (f) {

            if (!dataSet.data[0].undefined) {
                callback(false, dataSet);
            } else {
                //Still failed. Return error
                callback(true, null);

            }
        })
        .on('error', function (err) {
            callback(err, null);
        })
        .on('data', function (data) {
            if (data) {
                dataSet.data.push(data);
            }
        })
};

var xlsxToJson = function (filePath, callback) {


    var dataSet = {
        data: [],
        timeStamp: 0
    };

    xlsx({
        input: filePath,
        output: null
    }, function (err, data) {
        if (err) {
            callback(err, null)
        } else {
            dataSet.data = data
            callback(false, dataSet)
        }
    });

};

function SheetToJson(){

}

SheetToJson.prototype.process = function(filePath, callback){

    var fileExtension = filePath.split('.').pop();

    switch (fileExtension) {
        case 'csv':

            csvToJson(filePath, function (err, result) {
                callback(err, result);
            });
            break;
        case 'xlsx':

            xlsxToJson(filePath, function (err, result) {
                callback(err, result);
            });
            break
    }
};

module.exports = function(){

    return new SheetToJson();

};

