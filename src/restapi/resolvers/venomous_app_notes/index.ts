import { AxiosError } from "axios";
import type { Handler } from "express";

import {
  cachedVenomousAppNoteApis,
  CommonResponse,
  getErrorResponse,
} from "../../cached-apis/venomous_app_notes";

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
    const { data, error, code } = await cachedVenomousAppNoteApis.getNoteList(req);
    res.status(code).send({
      code,
      data: data,
      message: "",
      error,
    });
  } catch (error) {
    const { data, code, message } = getErrorResponse(
      error as AxiosError<CommonResponse>,
    );
    res.status(code).send({
      code,
      data,
      message,
      error: message,
    });
  }
};

/**
 * - GET /notes/api/note/<id>
 */
export const getNoteHandler: Handler = async (req, res) => {
  try {
    const { data, error, code } = await cachedVenomousAppNoteApis.getNote(req);
    res.status(code).send({
      code,
      data: data.note,
      message: data.message,
      error,
    });
  } catch (error) {
    const { data, code, message } = getErrorResponse(
      error as AxiosError<CommonResponse>,
    );
    res.status(code).send({
      code,
      data,
      message,
      error: message,
    });
  }
};

/**
 * - POST /notes/api/note/create
 */
export const createNoteHandler: Handler = async (req, res) => {
  try {
    const { data, error, code } = await cachedVenomousAppNoteApis.createNote(req);
    res.status(code).send({
      code,
      data: data.note,
      message: data.message,
      error,
    });
  } catch (error) {
    const { data, code, message } = getErrorResponse(
      error as AxiosError<CommonResponse>,
    );
    res.status(code).send({
      code,
      data,
      message,
      error: message,
    });
  }
};

/**
 * - PUT /notes/api/note/<id>
 */
export const updateNoteHandler: Handler = async (req, res) => {
  try {
    const { data, error, code } = await cachedVenomousAppNoteApis.updateNote(req);
    res.status(code).send({
      code,
      data: data.note,
      message: data.message,
      error,
    });
  } catch (error) {
    const { data, code, message } = getErrorResponse(
      error as AxiosError<CommonResponse>,
    );
    res.status(code).send({
      code,
      data,
      message,
      error: message,
    });
  }
};

/**
 * - DELETE /notes/api/note/<id>
 */
export const deleteNoteHandler: Handler = async (req, res) => {
  try {
    const { data, error, code } = await cachedVenomousAppNoteApis.deleteNote(req);
    res.status(code).send({
      code,
      data: data.note,
      message: data.message,
      error,
    });
  } catch (error) {
    const { data, code, message } = getErrorResponse(
      error as AxiosError<CommonResponse>,
    );
    res.status(code).send({
      code,
      data,
      message,
      error: message,
    });
  }
};

/**
 * - POST /notes/api/account/login
 */
export const loginAccountHandler: Handler = async (req, res) => {
  try {
    const { data, error, code } = await cachedVenomousAppNoteApis.accountLogin(
      req.body,
    );
    res.status(code).send({
      code,
      data: data,
      message: "",
      error,
    });
  } catch (error) {
    const { data, code, message } = getErrorResponse(
      error as AxiosError<CommonResponse>,
    );
    res.status(code).send({
      code,
      data,
      message,
      error: message,
    });
  }
};
