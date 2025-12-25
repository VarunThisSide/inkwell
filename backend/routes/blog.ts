import { Hono } from "hono";
import { verify } from "hono/jwt";

const blogRouter = new Hono<{
  Bindings : {
    DATABASE_URL : string
    JWT_SECRET : string
  },
  Variables : {
    userId : string
  }
}>()

blogRouter.use('*', async (c , next) => {
  const payload = c.req.header('authorization')
  if (!payload) {
    c.status(403)
    return c.json({
      msg: 'Authorization failed'
    })
  }
  const token = payload.split(' ')[1]
  try {
    const payload = await verify(token, c.env.JWT_SECRET)
    //@ts-ignore
    c.set('userId', payload.id)
    await next()
  } catch (e) {
    c.status(403)
    return c.json({
      msg: 'Authorization failed'
    })
  }
})

blogRouter.post('/', (c) => {
  return c.json({})
})

blogRouter.put('/', (c) => {
  return c.json({})
})

blogRouter.get('/:id', (c) => {
  return c.json({})
})

blogRouter.get('/bulk', (c) => {
  return c.json({})
})

export default blogRouter