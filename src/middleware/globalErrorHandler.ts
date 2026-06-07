import type { Next, Req, Res } from "../types";

const globalErrorHandler = (err: any, req: Req, res: Res, next: Next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
};

export default globalErrorHandler;
