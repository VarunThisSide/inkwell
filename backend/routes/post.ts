import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Hono } from "hono";
import { verify } from "hono/jwt";

const postRouter = new Hono<{
  Bindings : {
    DATABASE_URL : string
    JWT_SECRET : string
  },
  Variables : {
    userId : string;
  }
}>()

postRouter.use('/*', async (c : Context , next) => {
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
    c.set('userId', payload.id)
    await next()
  } catch (e) {
    c.status(403)
    return c.json({
      msg: 'Authorization failed'
    })
  }
})

postRouter.post('/',async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const userId=c.get('userId')
  const body=await c.req.json()
  const post=await prisma.post.create({
    data : {
      title : body.title,
      content : body.content,
      authorId : userId
    }
  })
  return c.json({
    msg : 'post created',
    postId : post.id
  })
})

postRouter.put('/',async (c) => {
  const prisma=new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const body=await c.req.json()
  await prisma.post.update({
    where : {
      id : body.id
    },
    data : {
      title : body.title,
      content : body.content,
    }
  })
  return c.json({
    msg : 'post Updated'
  })
})

postRouter.get('/:id',async (c) => {
  const prisma=new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const postId=c.req.param('id')
  try{
    const post=await prisma.post.findUnique({
      where : {
        id : postId
      }
    })
    return c.json(post)
  }catch(e){
    c.status(411)
    return c.json({
      msg : 'Error while fetching blog'
    })
  }
})

postRouter.get('/bulk',async (c) => {
  const prisma=new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const allPosts=await prisma.post.findMany()
  return c.json({
    allPosts
  })
})

export default postRouter