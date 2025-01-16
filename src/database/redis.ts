import { createClient, type RedisClientType } from "redis";

import { BFF_SERVER_CONFIGS } from "../configs";
import { printErrorMessage, printProcessTime } from "../utils/helpers/handle-log";

const redisClient: RedisClientType = createClient({
  socket: {
    host: BFF_SERVER_CONFIGS.db.redisHost,
    port: BFF_SERVER_CONFIGS.db.redisPort,
    timeout: 5000,
  },
});

export async function getRedisClient(): Promise<RedisClientType> {
  return redisClient;
}

export async function connectRedis() {
  printProcessTime({
    processName: "Redis Connection",
    func: async () => {
      const client = await getRedisClient();

      client.on("error", (err) => {
        printErrorMessage("Redis Client Error");
        throw new Error((err as Error).message);
      });

      await client.connect();
    },
  });
}

export function closeRedisClient() {
  redisClient.quit();
}

/**
 * 设置 Redis 中的键值对
 * @param key {string} 键名
 * @param value {unknown} 值
 * @param ttl {number | null} 过期时间
 */
export async function setRedisKey<T>(
  key: string,
  value: T,
  ttl: number | null = null,
): Promise<void> {
  await redisClient.set(key, JSON.stringify(value));

  if (ttl) {
    await redisClient.expire(key, ttl);
  }
}

/**
 * 获取 Redis 中的键值对
 * @param key {string} 键名
 */
export async function getRedisKey<T>(key: string): Promise<T> {
  return JSON.parse((await redisClient.get(key)) || "null") as T;
}

/**
 * 删除 Redis 中的键值对
 * @param key {string} 键名
 */
export async function deleteRedisKey(key: string): Promise<void> {
  await redisClient.del(key);
}
