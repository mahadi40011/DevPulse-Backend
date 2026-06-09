import { pool } from "../db";
import { UserRoles, type Next, type Req, type Res } from "../types";
import { sendResponse } from "../utils/sendResponse";

const canUpdateIssue = async (req: Req, res: Res, next: Next) => {
  try {
    const user = req.user;
    const issueId = req.params.id;

    // get issue from database
    const result = await pool.query(`SELECT * FROM issues WHERE id=$1`, [
      issueId,
    ]);

    const issue = result.rows[0];

    if (!issue) {
      return res
        .status(404)
        .json({ success: false, message: "Issue not found" });
    }

    // user role check with database
    const userData = await pool.query(`SELECT role FROM users WHERE id=$1`, [
      user!.id,
    ]);
    const userRole = userData.rows[0].role;
    if (userRole !== user!.role) {
      return sendResponse(res, 403, "User role mismatch");
    }

    // Maintainer --> allow all
    if (user!.role === UserRoles.maintainer) {
      return next();
    }

    // Contributor --> only own && open
    if (user!.role === UserRoles.contributor) {
      if (issue.reporter_id !== user!.id) {
        return sendResponse(res, 403, "You can only update your own issues");
      }

      if (issue.status !== "open") {
        return sendResponse(res, 403, "Only open issues can be updated");
      }

      return next();
    }

    return sendResponse(res, 403, "Forbidden! You have no permission");
  } catch (error) {
    next(error);
  }
};

export default canUpdateIssue;
