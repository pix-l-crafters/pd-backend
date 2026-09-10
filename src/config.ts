export type AppConfig = {
  host: string;
  port: number;
  clientOrigin: string;
};

function parsePort(value: string | undefined): number {
  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  return port;
}

export function getConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    host: env.HOST ?? "0.0.0.0",
    port: env.PORT ? parsePort(env.PORT): 3000,
    clientOrigin: env.CLIENT_ORIGIN ?? "*"
  };
}
