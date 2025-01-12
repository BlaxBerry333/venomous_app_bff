import { AxiosError } from "axios";

import { venomousAppNoteApis } from "../../../restapi/resolvers/venomous_app_notes";
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
        const { data: responseData } = await venomousAppNoteApis.getNoteList(
          args.input,
        );
        return responseData.data;
      } catch (error) {
        return {
          list: null,
          message: (error as AxiosError).message,
          code: 500,
        };
      }
    },

    getNote: async (
      _: unknown,
      args: QueryGetNoteArgs,
    ): Promise<GetNoteQueryResponse> => {
      try {
        const { data: responseData } = await venomousAppNoteApis.getNote(args.id);
        return responseData.data;
      } catch (error) {
        return {
          note: null,
          message: (error as AxiosError).message,
          code: 500,
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
        const { data: responseData } = await venomousAppNoteApis.createNote(args.input);
        if (responseData.error) {
          throw new Error(`${responseData.code}-${responseData.error}`);
        }
        return responseData.data;
      } catch (error) {
        const [code, message] = (error as AxiosError).message?.split("-") || [];
        return {
          note: null,
          message,
          code: Number(code) || 500,
        };
      }
    },

    updateNote: async (
      _: unknown,
      args: MutationUpdateNoteArgs,
    ): Promise<UpdateNoteMutationResponse> => {
      try {
        const { data: responseData } = await venomousAppNoteApis.updateNote(
          args.id,
          args.input,
        );
        return responseData.data;
      } catch (error) {
        return {
          note: null,
          message: (error as AxiosError).message,
          code: 500,
        };
      }
    },

    deleteNote: async (
      _: unknown,
      args: MutationDeleteNoteArgs,
    ): Promise<DeleteNoteMutationResponse> => {
      try {
        const { data: responseData } = await venomousAppNoteApis.deleteNote(args.id);
        return responseData.data;
      } catch (error) {
        return {
          note: null,
          message: (error as AxiosError).message,
          code: 500,
        };
      }
    },
  },
};
