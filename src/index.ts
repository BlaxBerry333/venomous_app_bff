import express from "express";

import { expressMiddleware } from "@apollo/server/express4";

import { BFF_SERVER_CONFIGS } from "./configs";
import { default as apolloServer } from "./graphql";
import { default as router } from "./restapi/routers";
import { printServerStartMessage } from "./utils/helpers/handle-log";
import {
  corsMiddleware,
  faviconIgnoreMiddleware,
  requestStartMiddleware,
  responseFinishMiddleware,
} from "./utils/middlewares/_index";

const app = express();

async function main() {
  // Middlewares
  // ----------------------------------------------------------------------------------------------------
  app.use(corsMiddleware);
  app.use(faviconIgnoreMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestStartMiddleware);
  app.use(responseFinishMiddleware);

  // Apollo Server
  // ----------------------------------------------------------------------------------------------------
  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer));

  // Restful API Router
  // restful 路由中间件必须位于 apollo server 中间件之后
  // ----------------------------------------------------------------------------------------------------
  app.use(router);

  // Listen Server
  // ----------------------------------------------------------------------------------------------------
  app.listen(BFF_SERVER_CONFIGS.server.port, () => {
    printServerStartMessage();
  });
}

main();
