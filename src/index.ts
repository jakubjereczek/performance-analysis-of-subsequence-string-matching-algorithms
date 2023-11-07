import express, { Request, Response } from "express";
import TextCache from "./textCache";
import { bruteForce } from "./algorithms";
import path from "path";
import MonitorInstance from "./core/Monitor";
const app = express();

app.use(require("express-status-monitor")());

// /brute-force-algorithm?search=wordterm
app.get("/brute-force-algorithm", async (req: Request, res: Response) => {
  const fullText = await TextCache.getText();

  const monitorInstance = new MonitorInstance();
  monitorInstance.init({
    iterations: 100,
    delay: 500,
    callback: () => {
      bruteForce(fullText, req.query.search as string);
    },
    onFinishCallback: (results) => {
      console.log("results", results);
    },
  });

  res.send("ok");
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../", "public", "index.html"));
});

app.listen(3000, () => {
  console.log(`[Server]: Server is running at http://localhost:3000`);
});
