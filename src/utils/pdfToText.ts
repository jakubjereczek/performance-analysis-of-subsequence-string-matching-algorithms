const pdfUtil = require('pdf-parse');
import path from 'path';
import fs from 'fs';
import { PDFSource } from '../structures';

async function pdfToText(source: string): Promise<PDFSource> {
  const pathname = path.resolve(__dirname, '../sources', source);
  const dataBuffer = fs.readFileSync(pathname);

  return new Promise((resolve, reject) => {
    pdfUtil(dataBuffer)
      .then(function (data: any) {
        resolve(data);
      })
      .catch(function (err: any) {
        reject(err);
      });
  });
}

export default pdfToText;