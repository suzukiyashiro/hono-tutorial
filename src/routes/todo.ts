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
  */
});

// Todoの取得
todo.get("/", (c) => {
  return c.json(todos);
});

// 特定のTodoの取得
todo.get("/:id", (c) => {
  const { id } = c.req.param();
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return c.text("Todoが見つかりませんでした", 404);
  }
  return c.json(todo);
});

// Todoの編集
todo.put("/edit/:id", async (c) => {
  const { id } = c.req.param();
  const { title, desc } = await c.req.json();
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex < 0) {
    return c.text("Todoが見つかりませんでした", 404);
  }
  todos[todoIndex] = { ...todos[todoIndex], title, desc };
  return c.json(todos[todoIndex]);
});

// Todoの完了
todo.put("/complete/:id", (c) => {
  const { id } = c.req.param();
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex < 0) {
    return c.text("Todoが見つかりませんでした", 404);
  }
  todos[todoIndex]["isCompleted"] = true;
  return c.json(todos[todoIndex]);
});

// Todoの削除
todo.delete("/:id", (c) => {
  const { id } = c.req.param();
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex < 0) {
    return c.text("Todoが見つかりませんでした", 404);
  }
  todos.splice(todoIndex, 1);
  return c.text("Todoを削除しました", 200);
});

export { todo };
