import packageJson from "../../package.json";

export const BFF_SERVER_CONFIGS = {
  info: {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
  },

  server: {
    port: parseInt(process.env.BFF_SERVER_PORT!),
    envName: process.env.BFF_SERVER_ENV_NAME!,
    isDevEnv: process.env.BFF_SERVER_ENV_NAME === "development",
    whiteList: [process.env.DOMAIN_ADMIN_SERVER, process.env.DOMAIN_ADMIN_CLIENT],
  },

  db: {
    redisHost: process.env.BFF_SERVER_REDIS_HOST || "127.0.0.1",
    redisPort: Number(process.env.BFF_SERVER_REDIS_PORT) || 6379,
  },

  domain: {
    bffServer: process.env.DOMAIN_BFF,
    adminServer: process.env.DOMAIN_ADMIN_SERVER,
    adminClient: process.env.DOMAIN_ADMIN_CLIENT,
    venomousAppNoteApi: process.env.DOMAIN_VENOMOUS_APP_NOTE_API,
    venomousAppNoteChatApi: process.env.DOMAIN_VENOMOUS_APP_CHAT_API,
  },
} as const;
