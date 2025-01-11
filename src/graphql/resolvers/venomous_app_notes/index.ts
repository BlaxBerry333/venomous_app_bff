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
  SelectableNoteType,
  UpdateNoteMutationResponse,
} from "../../generated/graphql";

export const resolvers = {
  Query: {
    getNoteList: async (
      _: unknown,
      args: QueryGetNoteListArgs,
    ): Promise<GetNoteListQueryResponse> => {
      // eslint-disable-next-line no-console
      console.log(args.input);
      return {
        currentPage: 0,
        totalCount: 0,
        totalPages: 0,
        notes: [],
      };
    },

    getNote: async (
      _: unknown,
      args: QueryGetNoteArgs,
    ): Promise<GetNoteQueryResponse> => {
      // eslint-disable-next-line no-console
      console.log(args.id);
      return {
        message: "",
        note: {
          _id: "",
          type: SelectableNoteType.Raft,
          title: "",
          message: "",
          created_at: "",
          updated_at: "",
        },
      };
    },
  },

  Mutation: {
    createNote: async (
      _: unknown,
      args: MutationCreateNoteArgs,
    ): Promise<CreateNoteMutationResponse> => {
      // eslint-disable-next-line no-console
      console.log(args.input);
      return {
        message: "",
        note: {
          _id: "",
          type: SelectableNoteType.Raft,
          title: "",
          message: "",
          created_at: "",
          updated_at: "",
        },
      };
    },

    updateNote: async (
      _: unknown,
      args: MutationUpdateNoteArgs,
    ): Promise<UpdateNoteMutationResponse> => {
      // eslint-disable-next-line no-console
      console.log(args.id);
      return {
        message: "",
        note: {
          _id: "",
          type: SelectableNoteType.Raft,
          title: "",
          message: "",
          created_at: "",
          updated_at: "",
        },
      };
    },

    deleteNote: async (
      _: unknown,
      args: MutationDeleteNoteArgs,
    ): Promise<DeleteNoteMutationResponse> => {
      // eslint-disable-next-line no-console
      console.log(args.id);
      return {
        message: "",
        note: {
          _id: "",
          type: SelectableNoteType.Raft,
          title: "",
          message: "",
          created_at: "",
          updated_at: "",
        },
      };
    },
  },
};
