import { Hono } from "hono";

export const book = new Hono()

book.get('/', (c) => c.text("/"))
book.get("/:id", (c) => {
  const id = c.req.param('id')
  return c.text("Get Book: " + id)
})
book.post('/', (c) => c.text("CreateBook"))
