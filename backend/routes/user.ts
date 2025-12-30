import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signupInput , signinInput } from "@varunthisside/inkwell-common";
import { Context } from "hono";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async (c) => {
  const body = await c.req.json()
  const validatedPayload=signupInput.safeParse(body)
  if(!validatedPayload.success){
    c.status(411)
    return c.json({
      error : validatedPayload.error.message,
      msg : 'Wrong input'
    })
  }
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const alreadyExists=await prisma.user.findUnique({
    where : {
      email : body.email
    }
  })
  if(alreadyExists){
    c.status(411)
    return c.json({
      msg : 'User already exists with this email'
    })
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password
    }
  })
  const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({
    msg: 'User Created!',
    token
  })
})

userRouter.post('/signin', async (c) => {
  const body = await c.req.json()
  const validatedPayload=signinInput.safeParse(body)
  if(!validatedPayload.success){
    c.status(411)
    return c.json({
      error : validatedPayload.error.message,
      msg : 'Wrong Input'
    })
  }
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  })

  if (!user) {
    c.status(403)
    return c.json({
      msg: 'User not exists or invalid credentials'
    })
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({
    token
  })
})

userRouter.use('/posts/*',async (c : Context , next)=>{
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

userRouter.get('/posts/:id' , async (c : Context)=>{
  const authorId=c.req.param('id')
  const prisma=new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const authorPosts=await prisma.user.findUnique({
    where : {
      id : authorId,
    },
    select : {
      posts : {
        select : {
          id : true,
          title : true,
          content : true,
          postDate : true,
          author : {
            select : {
              name : true,
              id : true
            }
          }
        }
      },
    }
  })
  const userId=c.get('userId')
  return c.json({
    authorPosts : authorPosts?.posts,
    userId
  })
})

export default userRouter