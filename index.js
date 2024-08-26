"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var csv_stringify_1 = require("csv-stringify");
var gracefulFs = require("graceful-fs");
gracefulFs.gracefulify(fs);
var columns = {
    fileName: 'File Name',
    size: 'Size, bytes',
    kbSize: 'Size, kB',
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
    var total = {
        bytes: 0,
        kB: 0,
        mB: 0,
        gB: 0,
    };
    var filesInfo = fileNames.map(function (fileName) {
        var size = getFilesize("./".concat(fileName));
        var kbSize = size / 1024;
        var mbSize = kbSize / 1024;
        var gbSize = mbSize / 1024;
        total.bytes += size;
        total.kB += kbSize;
        total.mB += mbSize;
        total.gB += gbSize;
        return { fileName: fileName, size: size, kbSize: "".concat(kbSize.toFixed(2), " kB"), mbSize: "".concat(mbSize.toFixed(2), " Mb"), gbSize: "".concat(gbSize.toFixed(2), " Gb") };
    });
    (0, csv_stringify_1.stringify)(filesInfo, { header: true, columns: columns }, function (err, output) {
        if (err)
            throw err;
        output += '\n';
        output += "Total,".concat(total.bytes, ",").concat(total.kB.toFixed(2), " kB,").concat(total.mB.toFixed(2), " Mb,").concat(total.gB.toFixed(2), " Gb");
        fs.writeFile('my.csv', output, function (err) {
            if (err)
                throw err;
        });
    });
});
