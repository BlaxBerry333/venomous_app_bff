import { BFF_SERVER_CONFIGS } from "../../../configs";
import { BffServerInformation } from "../../generated/graphql";

export const resolvers = {
  Query: {
    bffServerInformation: async (): Promise<BffServerInformation> => {
      return BFF_SERVER_CONFIGS.info;
    },
  },

  Mutation: {},
};
