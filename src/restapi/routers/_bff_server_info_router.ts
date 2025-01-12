import { Router } from "express";
import { getBffServerInformationHandler } from "../resolvers/bff_server";

const bffServerInfoRouter = Router();

// GET /bff_info/
bffServerInfoRouter.get("/", getBffServerInformationHandler);

export default bffServerInfoRouter;
