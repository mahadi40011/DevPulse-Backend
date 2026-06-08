import { Router } from "express";
import { issuesController } from "./issues.controller";
import authMiddleware from "../../middleware/auth.middleware";
import { UserRoles } from "../../types";
import canUpdateIssue from "../../middleware/canUpdateIssue.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware(UserRoles.maintainer, UserRoles.contributor),
  issuesController.createIssues,
);
router.get("", issuesController.getAllIssues);
router.get("/:id", issuesController.getSingleIssue);
router.patch(
  "/:id",
  authMiddleware(UserRoles.contributor, UserRoles.maintainer),
  canUpdateIssue,
  issuesController.updateIssue,
);

export const issuesRouter = router;
