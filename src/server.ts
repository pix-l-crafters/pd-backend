import { serve } from "@hono/node-server";
import { getConfig } from "./config.js";
import { cors } from "hono/cors";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { exampleRoute } from "./routes/example.js";
import { healthRoute } from "./routes/health.js";

const config = getConfig();
const app = new Hono();

app.use("*", logger());
app.use("*",
  cors({
    origin: config.clientOrigin,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  })
);

app.get("/", (c) =>
  c.json({
    name: "pocket-draw-backend",
    api: "/api/v1",
    health: "/health"
  })
);
app.route("/health", healthRoute);
app.route("/api/v1/example", exampleRoute);

app.notFound((c) => c.json({ error: "Not found" }, 404));
app.onError((error, c) => {
  console.error(error);
  return c.json({ error: "Internal server error" }, 500);
});

serve({
    fetch: app.fetch,
    hostname: config.host,
    port: config.port
  },
  (info) => {
    console.log(`API listening on http://${info.address}:${info.port}`);
  }
);
