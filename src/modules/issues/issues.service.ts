import type { JwtPayload } from "jsonwebtoken";
import type { IIssuesPayload } from "./issues.interface";
import { pool } from "../../db";
import AppError from "../../utils/appError";

const createIssuesService = async (
  payload: IIssuesPayload,
  reporterInfo: JwtPayload,
) => {
  const { title, description, type } = payload;

  const allowedTypes = ["feature_request", "bug"];

  if (!allowedTypes.includes(type as string)) {
    throw new AppError("Invalid type", 400);
  }

  const result = await pool.query(
    `
    INSERT INTO issues(title, description, type, reporter_id) 
    VALUES($1, $2, $3, $4)
    RETURNING *
    `,
    [title, description, type, reporterInfo.id],
  );

  return result.rows[0];
};

const getAllIssuesService = async (query: any) => {
  return query
}

export const issuesService = {
  createIssuesService,
  getAllIssuesService,
};
