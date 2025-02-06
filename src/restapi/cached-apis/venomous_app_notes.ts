import axios, { AxiosError } from "axios";
import type { Request } from "express";

import { BFF_SERVER_CONFIGS } from "../../configs";
import {
  deleteRedisKey,
  getRedisKey,
  getRedisKeysByPattern,
  setRedisKey,
} from "../../database/redis";

const _apiInstance = axios.create({
  baseURL: BFF_SERVER_CONFIGS.domain.venomousAppNoteApi,
  timeout: 10000,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommonResponse<T = any> = {
  code: number;
  data: T & { message?: string };
  error: string;
};

export function getErrorResponse(error: AxiosError<CommonResponse>) {
  const errorResponse = error.response?.data;
  const code = errorResponse?.code || 500;
  const message = errorResponse?.error || error.message;
  return {
    code,
    data: null,
    message,
  };
}

export const cachedVenomousAppNoteApis = {
  getNoteList: async (req: Request) => {
    const params = req.query;
    const { data: responseData } = await _apiInstance.get<CommonResponse>(
      "/api/note/list",
      { params, headers: { Authorization: req.headers.authorization } },
    );

    const orderField = params?.sort ?? "created_at";
    const sortOption = params?.order_by === "asc" ? 1 : -1;
    const typeField = params?.type || "ALL";
    const page = params?.page || 1;
    const count = params?.count || 10;

    // ------------------------------------------------------------------------------------------

    const REDIS_KEY: string = `note-list:${orderField}:${sortOption}:${typeField}:${page}:${count}`;

    const redisCachedData = await getRedisKey<CommonResponse>(REDIS_KEY);
    if (redisCachedData) {
      return redisCachedData;
    }
    await setRedisKey(REDIS_KEY, responseData, 60 * 5);

    return responseData;
  },

  getNote: async (req: Request) => {
    const id = req.params.id;
    const { data: responseData } = await _apiInstance.get<CommonResponse>(
      `/api/note/${id}`,
      { headers: { Authorization: req.headers.authorization } },
    );

    const REDIS_KEY: string = `note-${id}`;
    const redisCachedData = await getRedisKey<CommonResponse>(REDIS_KEY);
    if (redisCachedData) {
      return redisCachedData;
    }
    await setRedisKey(REDIS_KEY, responseData, 60 * 5);

    return responseData;
  },

  createNote: async (req: Request) => {
    const data = req.body;
    const { data: responseData } = await _apiInstance.post<CommonResponse>(
      "/api/note/create",
      data,
      { headers: { Authorization: req.headers.authorization } },
    );

    const REDIS_KEYS: string[] = await getRedisKeysByPattern("note-list:*");
    if (REDIS_KEYS.length > 0) {
      await deleteRedisKey(REDIS_KEYS);
    }

    return responseData;
  },

  updateNote: async (req: Request) => {
    const id = req.params.id;
    const data = req.body;
    const { data: responseData } = await _apiInstance.put<CommonResponse>(
      `/api/note/${id}`,
      data,
      { headers: { Authorization: req.headers.authorization } },
    );

    const REDIS_KEYS: string[] = await getRedisKeysByPattern("note-list:*");
    if (REDIS_KEYS.length > 0) {
      await deleteRedisKey(REDIS_KEYS);
    }
    const REDIS_KEY: string = `note-${id}`;
    await deleteRedisKey(REDIS_KEY);

    return responseData;
  },

  deleteNote: async (req: Request) => {
    const id = req.params.id;
    const { data: responseData } = await _apiInstance.delete<CommonResponse>(
      `/api/note/${id}`,
    );

    const REDIS_KEYS: string[] = await getRedisKeysByPattern("note-list:*");
    if (REDIS_KEYS.length > 0) {
      await deleteRedisKey(REDIS_KEYS);
    }
    const REDIS_KEY: string = `note-${id}`;
    await deleteRedisKey(REDIS_KEY);

    return responseData;
  },

  accountLogin: async (data: unknown) => {
    const { data: responseData } = await _apiInstance.post<CommonResponse>(
      "/api/account/login",
      data,
    );
    return responseData;
  },
};
