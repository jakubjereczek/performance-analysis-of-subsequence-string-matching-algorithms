import fs from 'fs';
import path from 'path';

async function getSources(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve(__dirname, '../sources'), (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

export default getSources;
