export interface IIssuesPayload {
  title: string;
  description: string;
  type: "feature_request" | "bug";
}

export interface IQuery {
  sort?: string;
  type?: string;
  status?: string;
}
