import express, { type Application } from "express";
import type { Req, Res } from "./types";
import loggerMiddleware from "./middleware/logger.middleware";
import { authRouter } from "./modules/auth/auth.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { issuesRouter } from "./modules/issues/issues.route";

const app: Application = express();

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req: Req, res: Res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to DevPuls server",
    developer: "M. H. Mahbub",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/issues", issuesRouter);

app.use(globalErrorHandler);

export default app;
