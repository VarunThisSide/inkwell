import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput , signinInput } from "@varunthisside/inkwell-common";

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

export default userRouter