import { Router } from "express";

import {
  createNoteHandler,
  deleteNoteHandler,
  getNoteHandler,
  getNoteListHandler,
  loginAccountHandler,
  updateNoteHandler,
} from "../resolvers/venomous_app_notes";

const venomousAppNotesApiRouter = Router();

// POST /notes/api/account/login
venomousAppNotesApiRouter.post("/api/account/login", loginAccountHandler);

// GET /notes/api/note/list
venomousAppNotesApiRouter.get("/api/note/list", getNoteListHandler);

// GET /notes/api/note/<id>
venomousAppNotesApiRouter.get("/api/note/:id", getNoteHandler);

// POST /notes/api/note/list
venomousAppNotesApiRouter.post("/api/note/create", createNoteHandler);

// PUT /notes/api/note/<id>
venomousAppNotesApiRouter.put("/api/note/:id", updateNoteHandler);

// DELETE /notes/api/note/<id>
venomousAppNotesApiRouter.delete("/api/note/:id", deleteNoteHandler);

export default venomousAppNotesApiRouter;
