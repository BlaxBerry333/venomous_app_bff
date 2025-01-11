# Venomous Apps' BFF

|     App Name     |                                                                                                                | Topic |  Port  |
| :--------------: | -------------------------------------------------------------------------------------------------------------- | :---: | :----: |
|    BFF Server    | [![My Skills](https://skillicons.dev/icons?i=docker,nodejs,express,graphql&perline=4)](https://skillicons.dev) |  BFF  | `9000` |
| BFF Server Redis | [![My Skills](https://skillicons.dev/icons?i=docker,redis&perline=4)](https://skillicons.dev)                  | Redis | `9100` |

## 🚀 Local Setup

```shell
% cd venomous_apps_bff

# 1. setup environments
% make setup

# 2. start all containers & start client server
% make start-all
```

## 🛠 Commands

```shell
# Containers
% make setup                        # setup all containers
% make build                        # build images of all containers
% make start-all                    # start all containers & start client server
% make stop-all                     # stop all containers
% make clean-all                    # stop then remove all containers、volumes、images
% make entry [CONTAINER_NAME]       # entry a specify container
% make restart [CONTAINER_NAME]     # restart a specific container

# Server
% npm run start:[mode]
% npm run build
% npm run codegen                   # generate typescript code from graphql schemas

# check lint & format
% npm run check-all
% npm run check-type
% npm run check-eslint
% npm run check-prettier
% npm run check-packages
% npm run format-all
% npm run eslint
% npm run prettier
```

## 📂 Project Structure

```shell
venomous_app_bff/
├── .cache/
│
├── src/
│    ├── configs/
│    │
│    ├── graphql/                           # graphql apis
│    │    ├── schemas /
│    │    │    └── ...
│    │    │
│    │    └── resolvers/
│    │         └── ...
│    │
│    ├── restapi/                           # restful apis
│    │    ├── resolvers/
│    │    │    └── ...
│    │    │
│    │    └── routers/
│    │         └── ...
│    │
│    ├── utils/
│    │    └── ...
│    │
│    ├── ...
│    │
│    └── index.ts
│
├── .env.development
├── .env.production
│
├── package.json
├── tsconfig.json
├── rollup.config.mjs
├── graphql-codegen.ts
│
└── ...
```

## 🤔 Questions

> How to stop Apollo Server Sandbox Polling?

1. open Apollo Server Sandbox `http://localhost:9000/graphql`
2. open **Connection settings**, then switch **Auto Update** to `OFF`
3. save configuration
