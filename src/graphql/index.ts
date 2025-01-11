import { ApolloServer } from "@apollo/server";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";

import { resolvers } from "./resolvers";

const schema = loadSchemaSync(`src/graphql/schemas/**/*.graphql`, {
  loaders: [new GraphQLFileLoader()],
});

const apolloServer = new ApolloServer({
  schema: addResolversToSchema({ schema, resolvers }),
  introspection: true, // 关闭 introspection 轮询
});

export default apolloServer;
