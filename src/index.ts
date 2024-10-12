import { Hono } from "hono";
import { todo } from "./routes/todo";

const app = new Hono();

app.route("/todo", todo);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
