import type { JwtPayload } from "jsonwebtoken";
import type { IIssuesPayload, IQuery } from "./issues.interface";
import { pool } from "../../db";
import AppError from "../../utils/appError";
import { Result } from "pg";

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

const getAllIssuesService = async (query: IQuery) => {
  const { sort = "newest", type, status } = query;

  const allowedSortValue = ["newest", "oldest"];
  const allowedTypeValue = ["bug", "feature_request"];
  const allowedStatusValue = ["open", "in_progress", "resolved"];

  if (sort && !allowedSortValue.includes(sort)) {
    throw new AppError("Invalid sort value", 400);
  }

  if (type && !allowedTypeValue.includes(type)) {
    throw new AppError("Invalid type value", 400);
  }

  if (status && !allowedStatusValue.includes(status)) {
    throw new AppError("Invalid status value", 400);
  }

  // Building dynamic WHERE clause based on type and status
  const conditions: string[] = [];
  const values: string[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  // Get all issues from database
  const issuesResult = await pool.query(
    `
    SELECT * FROM issues
    ${whereClause}
    ORDER BY created_at ${sort === "oldest" ? "ASC" : "DESC"}
    `,
    values,
  );

  const issues = issuesResult.rows;

  if (issues.length === 0) {
    throw new AppError("No issues found matching your filters", 404);
  }

  // Extract reporter IDs
  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];

  // Fetch reporters (batch) by reporter_id
  const userResult = await pool.query(
    `
    SELECT id, name, role
    FROM users
    WHERE id = ANY($1)
    `,
    [reporterIds],
  );

  const users = userResult.rows;

  // Create map
  const userMap = new Map();

  users.forEach((user) => {
    userMap.set(user.id, user);
  });

  // Attach reporter to issues
  const data = issues.map(
    ({ reporter_id, created_at, updated_at, ...issue }) => ({
      ...issue,
      reporter: userMap.get(reporter_id) || null,
      created_at,
      updated_at,
    }),
  );

  return data;
};

const getSingleIssueService = async (id: string) => {
  const issueData = await pool.query(`SELECT * FROM issues WHERE id=$1`, [id]);
  const issue = issueData.rows[0];

  const reporterInfo = await pool.query(
    `SELECT id, name, role FROM users WHERE id=$1`,
    [issue.reporter_id],
  );
  const reporter = reporterInfo.rows[0];

  const { reporter_id, created_at, updated_at, ...rest } = issue;
  const data = {
    ...rest,
    reporter,
    created_at,
    updated_at,
  };

  return data;
};

export const issuesService = {
  createIssuesService,
  getAllIssuesService,
  getSingleIssueService,
};
