import { Hono } from "hono";
import { TodoType } from "../types";
import { v4 as uuid } from "uuid";

const todo = new Hono();

// todo.get("/", (c) => {
//   return c.text("hello todo");
// });

// 空の配列
let todos: TodoType[] = [];

// Todoの作成
todo.post("/", async (c) => {
  const { title, desc } = await c.req.json();
  const newTodo: TodoType = {
    id: uuid(),
    title,
    desc,
    createdAt: new Date(),
    isCompleted: false,
  };
  todos.push(newTodo);
  return c.json(newTodo, 201);
  /* ちなみに...
    200: all ok
    201: all ok & something created(POST)
    204: all ok & no return (DELETE) 
  */
});

export { todo };
