import type { Resolvers } from "../generated/graphql";
import { resolvers as bffServerResolvers } from "./bff_server";
import { resolvers as venomous_app_notesResolvers } from "./venomous_app_notes";

export const resolvers: Resolvers = {
  Query: {
    ...bffServerResolvers.Query,
    ...venomous_app_notesResolvers.Query,
  },
  Mutation: {
    ...venomous_app_notesResolvers.Mutation,
  },
};
