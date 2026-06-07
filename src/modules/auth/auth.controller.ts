import type { Req, Res } from "../../types";
import { authService } from "./auth.service";

const signUpUser = async (req: Req, res: Res) => {
  try {
    const result = await authService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

export const authController = {
  signUpUser,
};
