import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      globals: {
        express: "express",
        cors: "cors",
        "@apollo/server/express4": "ApolloServerExpress4",
        "@apollo/server": "ApolloServer",
        "@graphql-tools/graphql-file-loader": "GraphQLFileLoader",
        "@graphql-tools/load": "GraphQLToolsLoad",
        "@graphql-tools/schema": "GraphQLToolsSchema",
      },
    },
    {
      file: "dist/index.min.js",
      format: "iife",
      name: "version",
      plugins: [terser()],
      globals: {
        express: "express",
        cors: "cors",
        "@apollo/server/express4": "ApolloServerExpress4",
        "@apollo/server": "ApolloServer",
        "@graphql-tools/graphql-file-loader": "GraphQLFileLoader",
        "@graphql-tools/load": "GraphQLToolsLoad",
        "@graphql-tools/schema": "GraphQLToolsSchema",
      },
    },
  ],

  plugins: [
    json(),
    typescript({
      module: "esnext",
    }),
  ],

  external: [
    "cors",
    "express",
    "@apollo/server/express4",
    "@apollo/server",
    "@graphql-tools/graphql-file-loader",
    "@graphql-tools/load",
    "@graphql-tools/schema",
  ],
};
