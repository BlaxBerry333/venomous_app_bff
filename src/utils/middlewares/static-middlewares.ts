import type { NextFunction, Request, Response } from "express";

// 忽略 favicon 请求
export const faviconIgnoreMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.url === "/favicon.ico") {
    res.status(204).end();
  } else {
    next();
  }
};
