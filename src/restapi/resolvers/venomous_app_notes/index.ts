import axios, { AxiosError } from "axios";
import type { Handler } from "express";

import { BFF_SERVER_CONFIGS } from "../../../configs";

const _apiInstance = axios.create({
  baseURL: BFF_SERVER_CONFIGS.domain.venomousAppNoteApi,
  timeout: 10000,
});

export const venomousAppNoteApis = {
  getNoteList: async (params: unknown) => {
    return await _apiInstance.get("/api/note/list", { params: params });
  },
  getNote: async (id: string) => {
    return await _apiInstance.get(`/api/note/${id}`);
  },
  createNote: async (data: unknown) => {
    return await _apiInstance.post("/api/note/create", data);
  },
  updateNote: async (id: string, data: unknown) => {
    return await _apiInstance.put(`/api/note/${id}`, data);
  },
  deleteNote: async (id: string) => {
    return await _apiInstance.delete(`/api/note/${id}`);
  },
};

// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------

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
    const { data: responseData } = await venomousAppNoteApis.getNoteList(req.query);
    res.status(responseData.code).send({
      data: responseData.data,
      error: responseData.error,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      error: (error as AxiosError).message,
    });
  }
};

/**
 * - GET /notes/api/note/<id>
 */
export const getNoteHandler: Handler = async (req, res) => {
  try {
    const { data: responseData } = await venomousAppNoteApis.getNote(req.params.id);
    res.status(responseData.code).send({
      data: responseData.data,
      error: responseData.error,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      error: (error as AxiosError).message,
    });
  }
};

/**
 * - POST /notes/api/note/create
 */
export const createNoteHandler: Handler = async (req, res) => {
  try {
    const { data: responseData } = await venomousAppNoteApis.createNote(req.body);
    res.status(responseData.code).send({
      data: responseData.data,
      error: responseData.error,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      error: (error as AxiosError).message,
    });
  }
};

/**
 * - PUT /notes/api/note/<id>
 */
export const updateNoteHandler: Handler = async (req, res) => {
  try {
    const { data: responseData } = await venomousAppNoteApis.updateNote(
      req.params.id,
      req.body,
    );
    res.status(responseData.code).send({
      data: responseData.data,
      error: responseData.error,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      error: (error as AxiosError).message,
    });
  }
};

/**
 * - DELETE /notes/api/note/<id>
 */
export const deleteNoteHandler: Handler = async (req, res) => {
  try {
    const { data: responseData } = await venomousAppNoteApis.deleteNote(req.params.id);
    res.status(responseData.code).send({
      data: responseData.data,
      error: responseData.error,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      error: (error as AxiosError).message,
    });
  }
};
