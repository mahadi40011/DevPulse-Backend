import type { JwtPayload } from "jsonwebtoken";
import type { Next, Req, Res } from "../../types";
import { sendResponse } from "../../utils/sendResponse";
import { issuesService } from "./issues.service";

const createIssues = async (req: Req, res: Res, next: Next) => {
  try {
    const result = await issuesService.createIssuesService(
      req.body,
      req.user as JwtPayload,
    );

    sendResponse(res, 201, "Issue created successfully", result);
  } catch (error) {
    next(error);
  }
};

const getAllIssues = async (req: Req, res: Res, next: Next) => {
  try {
    const result = await issuesService.getAllIssuesService(req.query);

    sendResponse(res, 200, "Issues retrieved successfully", result);
  } catch (error) {
    next(error);
  }
};

const getSingleIssue = async (req: Req, res: Res, next: Next) => {
  try {
    const { id } = req.params;
    const result = await issuesService.getSingleIssueService(id as string);

    sendResponse(res, 200, "Issue retrieved successfully", result);
  } catch (error) {
    next(error);
  }
};

const updateIssue = async (req: Req, res: Res, next: Next) => {
  try {
    const { id } = req.params;
    const result = await issuesService.updateIssueService(
      req.body,
      id as string,
    );

    sendResponse(res, 200, "Issue updated successfully", result);
  } catch (error) {
    next(error);
  }
};

const deleteIssue = async (req: Req, res: Res, next: Next) => {
  try {
    const { id } = req.params;
    const result = await issuesService.deleteIssueService(id as string);

    sendResponse(res, 200, "Issue deleted  successfully", result);
  } catch (error) {
    next(error);
  }
};

export const issuesController = {
  createIssues,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
