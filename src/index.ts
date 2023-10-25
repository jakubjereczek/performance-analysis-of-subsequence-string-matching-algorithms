import express, { Request, Response } from 'express';
import TextCache from './textCache';
import { bruteForce } from './algorithms';
import path from 'path';
import loop from './utils/loop';
import measurePerformance from './utils/measurePerformance';
import MemoryMonitor from './core/MemoryMonitor';
const app = express();

app.use(require('express-status-monitor')());

// /brute-force-algorithm?search=wordterm
app.get('/brute-force-algorithm', async (req: Request, res: Response) => {
  const fullText = await TextCache.getText();

  MemoryMonitor.start();
  loop(
    1000,
    10,
    () => {
      const fn = () => bruteForce(fullText, req.query.search as string);
      const performance = measurePerformance(fn);
      console.log('performance in ms', performance);
    },
    () => {
      MemoryMonitor.calculateAverageMemoryUsage();
      MemoryMonitor.stop();
    },
  );

  res.send('ok');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log(`[Server]: Server is running at http://localhost:3000`);
});

// TODO: Unify imports