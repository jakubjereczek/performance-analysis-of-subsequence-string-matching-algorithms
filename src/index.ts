import express, { Request, Response } from "express";
import path from "path";
import { runTests } from "./core/runTests";
import TextCache from "./textCache";
const app = express();

app.use(require("express-status-monitor")());

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../", "public", "index.html"));
});

app.listen(3000, () => {
  console.log(`[Server]: Server is running at http://localhost:3000`);
});

// preload sources text
async function preload() {
  await TextCache.getText();

  runTests();
}
preload();
