import type { NextFunction, Request, Response } from "express";

export type Req = Request;
export type Res = Response;
export type Next = NextFunction;

export type Roles = "maintainer" | "contributor";
