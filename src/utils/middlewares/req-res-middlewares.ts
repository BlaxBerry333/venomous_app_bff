import type { NextFunction, Request, Response } from "express";
import { printReqResTime } from "../helpers/handle-log";

/**
 * 请求开始中间件
 */
export const requestStartMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();
  res.locals.startTime = start;
  next();
};

/**
 * 响应结束中间件
 */
export const responseFinishMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { startTime } = res.locals;
  if (startTime) {
    res.on("finish", () => {
      const duration = Date.now() - startTime;
      const { method, originalUrl } = req;
      const { statusCode } = res;
      const responseTime = `${duration}ms`;
      printReqResTime({
        method,
        path: originalUrl,
        status: statusCode,
        time: responseTime,
      });
    });
  }
  next();
};
