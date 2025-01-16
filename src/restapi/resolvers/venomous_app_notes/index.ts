import { AxiosError } from "axios";
import type { Handler } from "express";

import { venomousAppNoteApis } from "../../cached-apis/venomous_app_notes";

/**
 * - GET /notes/api/note/list
 *
 * @example
 * /notes/api/note/list
 * /notes/api/note/list?type=raft
 * /notes/api/note/list?sort=created_at&order_by=asc
 * /notes/api/note/list?page=1&count=10
 */
export const getNoteListHandler: Handler = async (req, res) => {
  try {
    const { data, error, code } = await venomousAppNoteApis.getNoteList(req.query);

    res.status(code).send({
      code,
      data: data,
      message: "",
      error,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      data: null,
      message: (error as AxiosError).message,
      error: (error as AxiosError).message,
    });
  }
};

/**
 * - GET /notes/api/note/<id>
 */
export const getNoteHandler: Handler = async (req, res) => {
  try {
    const { data, error, code } = await venomousAppNoteApis.getNote(req.params.id);
    res.status(code).send({
      code,
      data: data.note,
      message: data.message,
      error,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      data: null,
      message: (error as AxiosError).message,
      error: (error as AxiosError).message,
    });
  }
};

/**
 * - POST /notes/api/note/create
 */
export const createNoteHandler: Handler = async (req, res) => {
  try {
    const { data, error, code } = await venomousAppNoteApis.createNote(req.body);
    res.status(code).send({
      code,
      data: data.note,
      message: data.message,
      error,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      data: null,
      message: (error as AxiosError).message,
      error: (error as AxiosError).message,
    });
  }
};

/**
 * - PUT /notes/api/note/<id>
 */
export const updateNoteHandler: Handler = async (req, res) => {
  try {
    const { data, error, code } = await venomousAppNoteApis.updateNote(
      req.params.id,
      req.body,
    );
    res.status(code).send({
      code,
      data: data.note,
      message: data.message,
      error,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      data: null,
      message: (error as AxiosError).message,
      error: (error as AxiosError).message,
    });
  }
};

/**
 * - DELETE /notes/api/note/<id>
 */
export const deleteNoteHandler: Handler = async (req, res) => {
  try {
    const { data, error, code } = await venomousAppNoteApis.deleteNote(req.params.id);
    res.status(code).send({
      code,
      data: data.note,
      message: data.message,
      error,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      data: null,
      message: (error as AxiosError).message,
      error: (error as AxiosError).message,
    });
  }
};
