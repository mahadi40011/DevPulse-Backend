import { pool } from "../../db";
import type { IRegisterUserPayload } from "./auth.interface";
import AppError from "../../utils/appError";
import bcrypt from "bcryptjs";

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

export const authService = {
  createUser,
};
