import * as fs from 'fs';
import { stringify } from 'csv-stringify';

console.log('Hello world!');

const columns = {
  fileName: 'File Name',
  size: 'Size, bytes',
  mbSize: 'Size, MB',
  gbSize: 'Size, GB',
};

function getFilesize(filename: string) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

fs.readdir(__dirname, (err, fileNames) => {
  if (err) {
    return;
  }
  console.log(fileNames);

  const filesInfo = fileNames.map(fileName => {
    const size = getFilesize(`./${fileName}`);
    const mbSize = size / (1024 * 1024);
    const gbSize = mbSize / 1024;
    // console.log(fileName, getFilesizeInMb(`./${fileName}`));
    return { fileName, size, mbSize: `${mbSize.toFixed(2)} Mb`, gbSize: `${gbSize.toFixed(2)} Gb` };
  })

  stringify(filesInfo, { header: true, columns: columns }, (err, output) => {
    if (err) throw err;
    fs.writeFile('my.csv', output, (err) => {
      if (err) throw err;
      console.log('my.csv saved.');
    });
  });
})