import { BFF_SERVER_CONFIGS } from "../../configs";

export function printSuccessMessage(message: string): void {
  // eslint-disable-next-line no-console
  console.log(`✨${message}`);
}

export function printErrorMessage(message: string): void {
  // eslint-disable-next-line no-console
  console.error(`❌${message}`);
}

/**
 * 打印函数的处理时间
 */
export async function printProcessTime(params: {
  func: () => void | Promise<void>;
  processName: string;
  successMessage?: string;
  errorMessage?: string;
  hiddenSuccessMessage?: boolean;
}): Promise<number> {
  const { func, processName, successMessage, errorMessage, hiddenSuccessMessage } =
    params;

  const start = process.hrtime();

  try {
    await func();

    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(0);

    if (!hiddenSuccessMessage) {
      printSuccessMessage(
        successMessage || `[${processName}] succeeded in ${durationMs}ms`,
      );
    }

    return parseFloat(durationMs);
  } catch (error) {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(0);

    printErrorMessage(errorMessage || `[${processName}] failed after ${durationMs}ms.`);
    throw new Error(errorMessage || (error as Error).message);
  }
}

export function printReqResTime(params: {
  method: string;
  status: number;
  path: string;
  time: string;
}): void {
  function statusStartsWith(n: number): boolean {
    return status.toString().startsWith(n.toString());
  }
  function getStatusColor(): string {
    return statusStartsWith(2)
      ? "\x1b[32m" // 绿色
      : statusStartsWith(3)
        ? "\x1b[33m" // 橙色
        : "\x1b[31m"; // 红色
  }

  const { method, status, path, time } = params;
  const currentDate = `\x1b[90m${new Date().toLocaleString()}\x1b[37m`; // 灰色
  const requestMethod = `${method}`; // 白色
  const responseStatus = `${getStatusColor()}${status}\x1b[37m`; // 2**：绿色；3**：橙色；其他：红色
  const requestURL = `\x1b[34m${path}\x1b[37m`; // 蓝色
  const responseTime = `${time}`; // 白色
  /* eslint-disable no-console */
  console.log(
    `${currentDate}\t${requestMethod}\t${responseStatus}\t${responseTime}\t${requestURL}`,
  );
  /* eslint-enable no-console */
}

/**
 * 打印 Server 启动信息
 */
export function printServerStartMessage(): void {
  const { name, version } = BFF_SERVER_CONFIGS.info;
  const { bffServer } = BFF_SERVER_CONFIGS.domain;
  const messages = [
    `\n✨ ${name}\x1b[32m v${version}\x1b[37m\n\n`,
    `\x1b[32m→\x1b[37m Local Server: \x1b[34m${bffServer}\x1b[37m\n`,
    `\x1b[32m→\x1b[37m GraphQL: \x1b[34m${bffServer}/graphql\x1b[37m\n\n`,
    `\x1b[32m→\x1b[37m \x1b[90mpress\x1b[37m control \x1b[90m+\x1b[37m c \x1b[90mto stop server\x1b[37m\n`,
  ];
  /* eslint-disable no-console */
  console.log(...messages);
  /* eslint-enable no-console */
}
