import cors from "cors";

import { BFF_SERVER_CONFIGS } from "../../configs";

/**
 * cors 中间件
 */
export const corsMiddleware = cors({
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  origin: BFF_SERVER_CONFIGS.server.whiteList as unknown as string[],
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  optionsSuccessStatus: 204,
});
