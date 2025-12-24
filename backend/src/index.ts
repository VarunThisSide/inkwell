import {Hono} from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app=new Hono<{
  Bindings : {
    DATABASE_URL : string
  }
}>()

app.use(cors())

app.post('api/v1/user/signup',async (c)=>{
  const prisma=new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body=await c.req.parseBody()
  await prisma.user.create({
    data:{
      email : body.email,
      name : body.name,
      password : body.password
    }
  })
  return c.res.json({
    msg : 'User Created!'
  })
})

app.post('api/v1/user/signin',(c)=>{
  return c.res.json({})
})

app.post('api/v1/blog',(c)=>{
  return c.res.json({})
})

app.put('api/v1/blog',(c)=>{
  return c.res.json({})
})

app.get('api/v1/blog/:id',(c)=>{
  return c.res.json({})
})

app.get('api/v1/blog/bulk',(c)=>{
  return c.res.json({})
})