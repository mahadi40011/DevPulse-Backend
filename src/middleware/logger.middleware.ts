import fs from "fs";
import type { Next, Req, Res } from "../types";

const loggerMiddleware = (req: Req, res: Res, next: Next) => {
  const log = `Time --> ${new Date().toLocaleString()}, Method --> ${req.method}, URL --> ${req.url}\n`;
  fs.appendFile("logger.txt", log, (error) => {
    console.log(error);
  });
  next();
};

export default loggerMiddleware;
