import type { JwtPayload } from "jsonwebtoken";
import type { Next, Req, Res } from "../../types";
import { sendResponse } from "../../utils/sendResponse";
import { issuesService } from "./issues.service";

const createIssues = async (req: Req, res: Res, next: Next) => {
  try {
    const result = await issuesService.createIssuesService(req.body, req.user as JwtPayload);

    sendResponse(res, 201, "Issue created successfully", result);
  } catch (error) {
    next(error);
  }
};

export const issuesController = {
  createIssues,
};
