import { Hono } from 'hono'
import { book } from './routes/books'

const app = new Hono<{ Bindings: CloudflareBindings }>().basePath('/api')

app.route('/book', book)
export default app
