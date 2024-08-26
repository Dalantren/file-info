import * as fs from 'fs';
import { stringify } from 'csv-stringify';
import * as gracefulFs from 'graceful-fs';
gracefulFs.gracefulify(fs);

const columns = {
  fileName: 'File Name',
  size: 'Size, bytes',
  kbSize: 'Size, kB',
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

  let total = {
    bytes: 0,
    kB: 0,
    mB: 0,
    gB: 0,
  };

  const filesInfo = fileNames.map(fileName => {
    const size = getFilesize(`./${fileName}`);
    const kbSize = size / 1024;
    const mbSize = kbSize / 1024;
    const gbSize = mbSize / 1024;
    total.bytes += size;
    total.kB += kbSize;
    total.mB += mbSize;
    total.gB += gbSize;
    return { fileName, size, kbSize: `${kbSize.toFixed(2)} kB`, mbSize: `${mbSize.toFixed(2)} Mb`, gbSize: `${gbSize.toFixed(2)} Gb` };
  })

  stringify(filesInfo, { header: true, columns: columns }, (err, output) => {
    if (err) throw err;
    output += '\n';
    output += `Total,${total.bytes},${total.kB.toFixed(2)} kB,${total.mB.toFixed(2)} Mb,${total.gB.toFixed(2)} Gb`;
    fs.writeFile('my.csv', output, (err) => {
      if (err) throw err;
    });
  });
})