const createIssuesService = async (payLoad: any) => {
  console.log("from issues service ", payLoad);
  return payLoad
};

export const issuesService = {
  createIssuesService,
};
