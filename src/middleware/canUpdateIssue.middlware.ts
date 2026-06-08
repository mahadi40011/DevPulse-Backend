import { pool } from "../db";
import type { Next, Req, Res } from "../types";

const canUpdateIssue = async (req: Req, res: Res, next: Next) => {
  try {
    const user = req.user;
    const issueId = req.params.id;

    const result = await pool.query(`SELECT * FROM issues WHERE id=$1`, [
      issueId,
    ]);

    const issue = result.rows[0];

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Maintainer --> allow all
    if (user!.role === "Maintainer") {
      return next();
    }

    // Contributor --> only own && open
    if (
      user!.role === "Contributor" &&
      issue.reporter_id === user!.id &&
      issue.status === "open"
    ) {
      return next();
    }
  } catch (error) {
    next(error);
  }
};

export default canUpdateIssue;
