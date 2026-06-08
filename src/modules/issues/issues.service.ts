import type { JwtPayload } from "jsonwebtoken";
import type { IIssuesPayload } from "./issues.interface";

const createIssuesService = async (
  payLoad: IIssuesPayload,
  reporterInfo: JwtPayload,
) => {
  console.log("from issues service ", payLoad);
  return { payLoad, reporterInfo };
};

export const issuesService = {
  createIssuesService,
};
