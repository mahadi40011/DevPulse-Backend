import type { Next, Req, Res } from "../../types";
import { authService } from "./auth.service";

const signUpUser = async (req: Req, res: Res, next: Next) => {
  try {
    const result = await authService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  signUpUser,
};
