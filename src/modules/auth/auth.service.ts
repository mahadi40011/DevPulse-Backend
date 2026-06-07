import type { IRegisterUserPayload } from "../../types";
import AppError from "../../utils/appError";

const createUser = async (payLoad: IRegisterUserPayload) => {
  const { name, email, password, role } = payLoad;
  const allowedRoles = ["maintainer", "contributor"];

  if (!allowedRoles.includes(role as string)) {
    throw new AppError("Invalid Role", 400);
  }
};

export const authService = {
  createUser,
};
