import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "A² API is alive",
  });
});

serve({
  fetch: app.fetch,
  port: 4000,
});

console.log("API running on http://localhost:4000");