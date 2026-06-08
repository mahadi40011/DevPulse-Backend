import { pool } from "../../db";
import type { IRegisterUserPayload } from "./auth.interface";
import AppError from "../../utils/appError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import envConfig from "../../config";

const createUser = async (payLoad: IRegisterUserPayload) => {
  const { name, email, password, role } = payLoad;

  const allowedRoles = ["maintainer", "contributor"];

  if (!allowedRoles.includes(role as string)) {
    throw new AppError("Invalid Role", 400);
  }

  const userExists = await pool.query(`SELECT 1 FROM users WHERE email=$1`, [
    email,
  ]);

  if (userExists.rowCount) {
    throw new AppError("This email is already registered", 409);
  }

  const hashPassword = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, role) 
     VALUES($1, $2, $3, $4)
     RETURNING *`,
    [name, email, hashPassword, role],
  );

  const { password: _, ...user } = result.rows[0];

  return user;
};

const loginUserService = async (payLoad: IRegisterUserPayload) => {
  const { email, password } = payLoad;

  const userData = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (!userData.rowCount) {
    throw new AppError("Invalid Credential", 401);
  }

  const userInfo = userData.rows[0];
  const isPasswordValid = await bcrypt.compare(password, userInfo.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid password", 401);
  }

  // Token generate
  const jwtPayload = {
    id: userInfo.id,
    name: userInfo.name,
    role: userInfo.role,
  };

  const accessToken = jwt.sign(jwtPayload, envConfig.jwt_secret as string, {
    expiresIn: "1d",
  });

  const { password: _, ...user } = userData.rows[0];

  return { token: accessToken, user };
};

export const authService = {
  createUser,
  loginUserService,
};
