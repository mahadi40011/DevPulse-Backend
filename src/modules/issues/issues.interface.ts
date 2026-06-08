import type { Roles } from "../../types";

export interface IIssuesPayload {
  title: string;
  description: string;
  type: "feature_request" | "bug";
}

export interface JWTPayload {
  id: number,
  name: string,
  role: Roles
}