import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";
import type { Next, Req, Res, Roles } from "../types";
import { sendResponse } from "../utils/sendResponse";
import envConfig from "../config";

const authMiddleware = (...roles: Roles[]) => {
  return async (req: Req, res: Res, next: Next) => {
    try {
      const token = req.headers.authorization;
      if (!token) return sendResponse(res, 401, "Unauthorized Access");

      const decoded = jwt.verify(
        token,
        envConfig.jwt_secret as string,
      ) as JwtPayload;

      const userData = await pool.query(
        `SELECT id, role FROM users WHERE id=$1`,
        [decoded.id],
      );

      if (userData.rowCount === 0)
        return sendResponse(res, 404, "User not found");

      if (roles.length && !roles.includes(userData.rows[0].role)) {
        return sendResponse(
          res,
          403,
          "Access denied. You do not have permission.",
        );
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authMiddleware;
