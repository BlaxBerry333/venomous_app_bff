import { AxiosError } from "axios";

import { venomousAppNoteApis } from "../../../restapi/cached-apis/venomous_app_notes";
import {
  CreateNoteMutationResponse,
  DeleteNoteMutationResponse,
  GetNoteListQueryResponse,
  GetNoteQueryResponse,
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
        const { data, error, code } = await venomousAppNoteApis.getNoteList(args.input);
        return {
          code,
          data,
          message: "",
          error: error || null,
        };
      } catch (error) {
        return {
          code: 500,
          data: null,
          message: (error as AxiosError).message,
          error: (error as AxiosError).message,
        };
      }
    },

    getNote: async (
      _: unknown,
      args: QueryGetNoteArgs,
    ): Promise<GetNoteQueryResponse> => {
      try {
        const { data, error, code } = await venomousAppNoteApis.getNote(args.id);
        return {
          code,
          data: data.note,
          message: data.message,
          error,
        };
      } catch (error) {
        return {
          code: 500,
          data: null,
          message: (error as AxiosError).message,
          error: (error as AxiosError).message,
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
        const { data, error, code } = await venomousAppNoteApis.createNote(args.input);
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
        const [code, message] = (error as AxiosError).message?.split("-") || [];
        return {
          code: Number(code) || 500,
          data: null,
          message: message || (error as AxiosError).message,
          error: (error as AxiosError).message,
        };
      }
    },

    updateNote: async (
      _: unknown,
      args: MutationUpdateNoteArgs,
    ): Promise<UpdateNoteMutationResponse> => {
      try {
        const { data, error, code } = await venomousAppNoteApis.updateNote(
          args.id,
          args.input,
        );
        return {
          code,
          data: data.note,
          message: data.message,
          error,
        };
      } catch (error) {
        return {
          code: 500,
          data: null,
          message: (error as AxiosError).message,
          error: (error as AxiosError).message,
        };
      }
    },

    deleteNote: async (
      _: unknown,
      args: MutationDeleteNoteArgs,
    ): Promise<DeleteNoteMutationResponse> => {
      try {
        const { data, error, code } = await venomousAppNoteApis.deleteNote(args.id);
        return {
          code,
          data: data.note,
          message: data.message,
          error,
        };
      } catch (error) {
        return {
          code: 500,
          data: null,
          message: (error as AxiosError).message,
          error: (error as AxiosError).message,
        };
      }
    },
  },
};
