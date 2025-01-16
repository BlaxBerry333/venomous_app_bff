import axios from "axios";
import { BFF_SERVER_CONFIGS } from "../../configs";
import { deleteRedisKey, getRedisKey, setRedisKey } from "../../database/redis";

const _apiInstance = axios.create({
  baseURL: BFF_SERVER_CONFIGS.domain.venomousAppNoteApi,
  timeout: 10000,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CommonResponse<T = any> = {
  code: number;
  data: T & { message?: string };
  error: string;
};

export const venomousAppNoteApis = {
  getNoteList: async (params: unknown) => {
    const { data: responseData } = await _apiInstance.get<CommonResponse>(
      "/api/note/list",
      { params: params },
    );

    const REDIS_KEY: string = `note-list`;
    const redisCachedData = await getRedisKey<CommonResponse>(REDIS_KEY);
    if (redisCachedData) {
      return redisCachedData;
    }
    await setRedisKey(REDIS_KEY, responseData, 60 * 5);

    return responseData;
  },

  getNote: async (id: string) => {
    const { data: responseData } = await _apiInstance.get<CommonResponse>(
      `/api/note/${id}`,
    );

    const REDIS_KEY: string = `note-${id}`;
    const redisCachedData = await getRedisKey<CommonResponse>(REDIS_KEY);
    if (redisCachedData) {
      return redisCachedData;
    }
    await setRedisKey(REDIS_KEY, responseData, 60 * 5);

    return responseData;
  },

  createNote: async (data: unknown) => {
    const { data: responseData } = await _apiInstance.post<CommonResponse>(
      "/api/note/create",
      data,
    );

    const REDIS_KEY: string = `note-list`;
    await deleteRedisKey(REDIS_KEY);

    return responseData;
  },

  updateNote: async (id: string, data: unknown) => {
    const { data: responseData } = await _apiInstance.put<CommonResponse>(
      `/api/note/${id}`,
      data,
    );

    const REDIS_KEY_1: string = `note-list`;
    const REDIS_KEY_2: string = `note-${id}`;

    await deleteRedisKey(REDIS_KEY_1);
    await deleteRedisKey(REDIS_KEY_2);

    return responseData;
  },
  deleteNote: async (id: string) => {
    const { data: responseData } = await _apiInstance.delete<CommonResponse>(
      `/api/note/${id}`,
    );

    const REDIS_KEY_1: string = `note-list`;
    const REDIS_KEY_2: string = `note-${id}`;

    await deleteRedisKey(REDIS_KEY_1);
    await deleteRedisKey(REDIS_KEY_2);

    return responseData;
  },
};
