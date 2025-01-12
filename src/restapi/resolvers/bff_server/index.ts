import type { Handler } from "express";

import { BFF_SERVER_CONFIGS } from "../../../configs";
import { ERROR_MESSAGES_TYPE } from "../../../utils/constants";

/**
 * GET /accounts/list
 */
export const getBffServerInformationHandler: Handler = async (_, res) => {
  res.status(200).send({
    data: BFF_SERVER_CONFIGS.info,
  });
};

/**
 * 404 notfound
 */
export const notFoundHandler: Handler = async (req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: `${ERROR_MESSAGES_TYPE.NOT_FOUND} ${req.method} ${req.path}`,
    },
  });
};
