import { Router } from "express";
import { issuesController } from "./issues.controller";
import authMiddleware from "../../middleware/auth.middleware";
import { UserRoles } from "../../types";

const router = Router();

router.post(
  "/",
  authMiddleware(UserRoles.maintainer, UserRoles.contributor),
  issuesController.createIssues,
);
router.get("", issuesController.getAllIssues);
router.get("/:id", issuesController.getSingleIssue);
router.patch("/:id", issuesController.updateIssue);

export const issuesRouter = router;
