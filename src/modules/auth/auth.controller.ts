import type { Next, Req, Res } from "../../types";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const signUpUser = async (req: Req, res: Res, next: Next) => {
  try {
    const result = await authService.createUser(req.body);
    
    sendResponse(res, 201, "User registered successfully", result);
  } catch (error) {
    next(error);
  }
};

export const authController = {
  signUpUser,
};
