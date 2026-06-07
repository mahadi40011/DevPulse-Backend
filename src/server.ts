import express from "express";
import envConfig from "./config";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(envConfig.port, () => {
  console.log(`Example app listening on port ${envConfig.port}`);
});
