import type { NextFunction, Request, Response } from "express";

export type Req = Request;
export type Res = Response;
export type Next = NextFunction;

export interface IRegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role?: "contributor" | "maintainer";
}