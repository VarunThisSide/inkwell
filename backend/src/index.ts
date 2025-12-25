import {Hono} from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify} from 'hono/jwt'

const app=new Hono<{
  Bindings : {
    DATABASE_URL : string;
    JWT_SECRET : string;
  }
}>()

app.post('/api/v1/user/signup',async (c)=>{
  const prisma=new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body=await c.req.json()
  const user=await prisma.user.create({
    data:{
      email : body.email,
      name : body.name,
      password : body.password
    }
  })
  const token=await sign({id : user.id},c.env.JWT_SECRET)
  return c.json({
    msg : 'User Created!',
    token
  })
})

app.post('/api/v1/user/signin',async (c)=>{
  const prisma=new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body=await c.req.json()
  const user=await prisma.user.findUnique({
    where : {
      email : body.email,
      password : body.password
    }
  })

  if(!user){
    c.status(403)
    return c.json({
      msg : 'User not exists or invalid credentials'
    })
  }

  const token=await sign({id : user.id},c.env.JWT_SECRET)
  return c.json({
    token
  })
})

app.post('/api/v1/blog',(c)=>{
  return c.json({})
})

app.put('/api/v1/blog',(c)=>{
  return c.json({})
})

app.get('/api/v1/blog/:id',(c)=>{
  return c.json({})
})

app.get('/api/v1/blog/bulk',(c)=>{
  return c.json({})
})

export default app
