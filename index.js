"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var csv_stringify_1 = require("csv-stringify");
console.log('Hello world!');
var columns = {
    fileName: 'File Name',
    size: 'Size, bytes',
    mbSize: 'Size, MB',
    gbSize: 'Size, GB',
};
function getFilesize(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}
fs.readdir(__dirname, function (err, fileNames) {
    if (err) {
        return;
    }
    console.log(fileNames);
    var filesInfo = fileNames.map(function (fileName) {
        var size = getFilesize("./".concat(fileName));
        var mbSize = size / (1024 * 1024);
        var gbSize = mbSize / 1024;
        // console.log(fileName, getFilesizeInMb(`./${fileName}`));
        return { fileName: fileName, size: size, mbSize: "".concat(mbSize.toFixed(2), " Mb"), gbSize: "".concat(gbSize.toFixed(2), " Gb") };
    });
    (0, csv_stringify_1.stringify)(filesInfo, { header: true, columns: columns }, function (err, output) {
        if (err)
            throw err;
        fs.writeFile('my.csv', output, function (err) {
            if (err)
                throw err;
            console.log('my.csv saved.');
        });
    });
});
