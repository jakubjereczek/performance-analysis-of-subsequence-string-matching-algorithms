import express, { Request, Response } from 'express';
import getSources from './utils/getSources';
import pdfToText from './utils/pdfToText';
import mapSources from './utils/mapSources';
import bruteForce from './algorithms/bruteForce';
const app = express();

app.use(require('express-status-monitor')());

app.get('/brute-force-algorithm', async (req: Request, res: Response) => {
  const sources = await getSources();
  const textPromises = sources.map(async (source) => await pdfToText(source));
  const texts = await Promise.all(textPromises);
  const fullText = mapSources(texts)

  res.send(bruteForce(fullText, 'word'));
});

app.listen(3000, () => {
  console.log(`[Server]: Server is running at http://localhost:3000`);
});