import { Hono } from "hono";

const todo = new Hono();

todo.get("/", (c) => {
  return c.text("hello todo");
});

export { todo };
