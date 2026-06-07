import express, { type Application } from "express";
import type { Req, Res } from "./types";


const app: Application = express();

app.get("/", (req: Req, res: Res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to DevPuls server",
    developer: "M. H. Mahbub",
  });
});

export default app
