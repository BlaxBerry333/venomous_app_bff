import { Router } from "express";

import {
  createNoteHandler,
  deleteNoteHandler,
  getNoteHandler,
  getNoteListHandler,
  updateNoteHandler,
} from "../resolvers/venomous_app_notes";

const venomousAppNotesApiRouter = Router();

// GET /notes/api/note/list
venomousAppNotesApiRouter.get("/api/note/list", getNoteListHandler);

// GET /notes/api/note/<id>
venomousAppNotesApiRouter.get("/api/note/:id", getNoteHandler);

// POST /notes/api/note/list
venomousAppNotesApiRouter.get("/api/note/create", createNoteHandler);

// PUT /notes/api/note/<id>
venomousAppNotesApiRouter.get("/api/note/:id", updateNoteHandler);

// DELETE /notes/api/note/<id>
venomousAppNotesApiRouter.get("/api/note/:id", deleteNoteHandler);

export default venomousAppNotesApiRouter;
