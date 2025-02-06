import { AxiosError } from "axios";

import {
  cachedVenomousAppNoteApis,
  CommonResponse,
  getErrorResponse,
} from "../../../restapi/cached-apis/venomous_app_notes";
import {
  AccountLoginMutationResponse,
  CreateNoteMutationResponse,
  DeleteNoteMutationResponse,
  GetNoteListQueryResponse,
  GetNoteQueryResponse,
  MutationAccountLoginArgs,
  MutationCreateNoteArgs,
  MutationDeleteNoteArgs,
  MutationUpdateNoteArgs,
  QueryGetNoteArgs,
  QueryGetNoteListArgs,
  UpdateNoteMutationResponse,
} from "../../generated/graphql";

export const resolvers = {
  Query: {
    getNoteList: async (
      _: unknown,
      args: QueryGetNoteListArgs,
    ): Promise<GetNoteListQueryResponse> => {
      try {
        const { data, error, code } = await cachedVenomousAppNoteApis.getNoteList({
          ...args,
          query: args.input,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        return {
          code,
          data,
          message: "",
          error: error || null,
        };
      } catch (error) {
        const { data, code, message } = getErrorResponse(
          error as AxiosError<CommonResponse>,
        );
        return {
          code,
          data,
          message,
          error: message,
        };
      }
    },

    getNote: async (
      _: unknown,
      args: QueryGetNoteArgs,
    ): Promise<GetNoteQueryResponse> => {
      try {
        const { data, error, code } = await cachedVenomousAppNoteApis.getNote({
          ...args,
          params: {
            id: args.id,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        return {
          code,
          data: data.note,
          message: data.message,
          error,
        };
      } catch (error) {
        const { data, code, message } = getErrorResponse(
          error as AxiosError<CommonResponse>,
        );
        return {
          code,
          data,
          message,
          error: message,
        };
      }
    },
  },

  Mutation: {
    createNote: async (
      _: unknown,
      args: MutationCreateNoteArgs,
    ): Promise<CreateNoteMutationResponse> => {
      try {
        const { data, error, code } = await cachedVenomousAppNoteApis.createNote({
          ...args,
          body: args.input,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        if (error) {
          throw new Error(`${code}-${error}`);
        }
        return {
          code,
          data: data.note,
          message: data.message,
          error,
        };
      } catch (error) {
        const errorResponse = getErrorResponse(error as AxiosError<CommonResponse>);
        const [code, message] = errorResponse.message?.split("-") || [];
        return {
          code: Number(code) || 500,
          data: errorResponse.data,
          message,
          error: message,
        };
      }
    },

    updateNote: async (
      _: unknown,
      args: MutationUpdateNoteArgs,
    ): Promise<UpdateNoteMutationResponse> => {
      try {
        const { data, error, code } = await cachedVenomousAppNoteApis.updateNote({
          ...args,
          prams: {
            id: args.id,
          },
          body: args.input,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        return {
          code,
          data: data.note,
          message: data.message,
          error,
        };
      } catch (error) {
        const { data, code, message } = getErrorResponse(
          error as AxiosError<CommonResponse>,
        );
        return {
          code,
          data,
          message,
          error: message,
        };
      }
    },

    deleteNote: async (
      _: unknown,
      args: MutationDeleteNoteArgs,
    ): Promise<DeleteNoteMutationResponse> => {
      try {
        const { data, error, code } = await cachedVenomousAppNoteApis.deleteNote({
          ...args,
          params: {
            id: args.id,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        return {
          code,
          data: data.note,
          message: data.message,
          error,
        };
      } catch (error) {
        const { data, code, message } = getErrorResponse(
          error as AxiosError<CommonResponse>,
        );
        return {
          code,
          data,
          message,
          error: message,
        };
      }
    },

    accountLogin: async (
      _: unknown,
      args: MutationAccountLoginArgs,
    ): Promise<AccountLoginMutationResponse> => {
      try {
        const { data, error, code } = await cachedVenomousAppNoteApis.accountLogin({
          ...args,
          body: args.input,
        });
        return {
          code,
          token: data.token,
          message: data.message,
          error,
        };
      } catch (error) {
        const { code, message } = getErrorResponse(error as AxiosError<CommonResponse>);
        return {
          code,
          token: null,
          message,
          error: message,
        };
      }
    },
  },
};
