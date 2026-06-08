import type { IIssuesPayload, JWTPayload } from "./issues.interface";

const createIssuesService = async (
  payLoad: IIssuesPayload,
  reporterInfo: JWTPayload,
) => {
  console.log("from issues service ", payLoad);
  return { payLoad, reporterInfo };
};

export const issuesService = {
  createIssuesService,
};
