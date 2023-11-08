import express, { Request, Response } from "express";
import TextCache from "./textCache";
import { bruteForce } from "./algorithms";
import path from "path";
import MonitorInstance from "./core/Monitor";
import FileStream from "./core/FileStream";
const app = express();

app.use(require("express-status-monitor")());

// /brute-force-algorithm?search=wordterm
app.get("/brute-force-algorithm", async (req: Request, res: Response) => {
  const fullText = await TextCache.getText();

  const { name, ...iterationInfo } = {
    name: "Brute Force",
    iterations: 1000,
    delay: 500,
  };

  const monitorInstance = new MonitorInstance();
  monitorInstance.init({
    ...iterationInfo,
    callback: () => {
      bruteForce(fullText, req.query.search as string);
    },
    onFinishCallback: (results) => {
      const fileStream = new FileStream(`${name}.txt`);
      fileStream.create();
      fileStream.write(name.toUpperCase());
      Object.entries(results).forEach((entry) => {
        fileStream.write(`${entry[0]}: ${entry[1]}`);
      });
      fileStream.close();

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
