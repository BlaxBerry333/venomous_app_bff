import { Router } from "express";

import { BFF_SERVER_CONFIGS } from "../../configs";
import { ERROR_MESSAGES_TYPE } from "../../utils/constants";

const mainRouter = Router();

// Home
mainRouter.get("/", (_, res) => {
  res.status(200).json({
    ...BFF_SERVER_CONFIGS.info,
  });
});

// 404 notfound
mainRouter.all("*", (req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: `${ERROR_MESSAGES_TYPE.NOT_FOUND} ${req.method} ${req.path}`,
    },
  });
});

export default mainRouter;
