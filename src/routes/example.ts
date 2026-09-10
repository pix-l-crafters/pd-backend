import { Hono } from "hono";

export const exampleRoute = new Hono()
  .get("/", (c) =>
    c.json({
      data: [],
      message: "Replace this route with a resource for the React Native app."
    })
  )
  .post("/", async (c) => {
    const body = await c.req.json<unknown>();

    return c.json({ data: body }, 201);
  });
