# Venomous Apps' BFF

|      App Name       |                                                                                                                | Topic |  Port  |
| :-----------------: | -------------------------------------------------------------------------------------------------------------- | :---: | :----: |
|     BFF Server      | [![My Skills](https://skillicons.dev/icons?i=docker,nodejs,express,graphql&perline=4)](https://skillicons.dev) |  BFF  | `9000` |
| BFF Server Redis DB | [![My Skills](https://skillicons.dev/icons?i=docker,redis&perline=4&theme=light)](https://skillicons.dev)      |  DB   | `9100` |

## 📚 Tech Stacks

- [node.js]() v22.0.0
- [express.js]() v4
- [rollup]() v4
- [axios]() v1
- [graphql]() v16
- [@apollo/server]() v4
- [@graphql-tools]() v8
- [redis]() v4
- [protobuf](https://github.com/BlaxBerry333/venomous_app_protobuf)
- ...

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

# check lint & format
% npm run check-all
% npm run check-type
% npm run check-eslint
% npm run check-prettier
% npm run check-packages
% npm run format-all
% npm run eslint
% npm run prettier

# Others
% npm run codegen                   # generate typescript code from graphql schemas
```

## 🔗 API

| Method | URL                         | Description                |
| ------ | --------------------------- | -------------------------- |
|        | bff server information apis |                            |
| GET    | `/bff_info`                 | get bff server information |
|        | venomous_app_notes apis     |                            |
| GET    | `/notes/api/note/list`      | get all notes              |
| POST   | `/notes/api/note/create`    | create a note              |
| POST   | `/notes/api/note/<id>`      | get a specific note        |
| PUT    | `/notes/api/note/<id>`      | update a specific note     |
| DELETE | `/notes/api/note/<id>`      | delete a specific note     |

## 📂 Project Structure

```shell
venomous_app_bff/
├── .cache/
│
├── src/
│    ├── configs/
│    │
│    ├── database/
│    │    └── redis.ts
│    │
│    ├── graphql/                           # graphql apis
│    │    ├── generated/
│    │    │    └── graphql.ts
│    │    │
│    │    ├── schemas/
│    │    └── resolvers/
│    │
│    ├── restapi/                           # restful apis
│    │    ├── cached-apis/
│    │    ├── resolvers/
│    │    └── routers/
│    │
│    ├── utils/
│    │    ├── helpers/
│    │    ├── middlewares/
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

> Some API connection failure `connect ECONNREFUSED`

- Make sure both servers are running inside Docker and are connected to the same Docker network.
- or, run both servers without Docker.
