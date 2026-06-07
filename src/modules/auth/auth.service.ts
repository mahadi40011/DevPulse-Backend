import type { IRegisterUserPayload } from "../../types";

const createUser = async (payLoad: IRegisterUserPayload) => {
  console.log(payLoad)
};

export const authService = {
  createUser,
};
