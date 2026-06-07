import type { Res } from "../types";

export const sendResponse = <T>(
  res: Res,
  statusCode: number,
  message: string,
  data?: T,
) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
  });
};
