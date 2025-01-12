import { Router } from "express";

import { notFoundHandler } from "../resolvers/bff_server";
import bffServerInfoRouter from "./_bff_server_info_router";
import venomousAppNotesApiRouter from "./_venomous_app_notes_api_router";

const mainRouter = Router();

// Home
// ----------------------------------------------------------------------------
mainRouter.get("/", (_, res) => res.status(302).redirect("/bff_info/"));

// SubRouter Others
// ----------------------------------------------------------------------------
mainRouter.use(`/bff_info`, bffServerInfoRouter);
mainRouter.use(`/notes`, venomousAppNotesApiRouter);

// 404 notfound
// ----------------------------------------------------------------------------
mainRouter.all("*", notFoundHandler);

export default mainRouter;
