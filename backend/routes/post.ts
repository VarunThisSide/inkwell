import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput , updatePostInput } from "@varunthisside/inkwell-common";

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
  const body=await c.req.json()
  const validatedPayload=createPostInput.safeParse(body)
  if(!validatedPayload.success){
    c.status(411)
    return c.json({
      error : validatedPayload.error.message,
      msg : 'Wrong Input'
    })
  }
  const prisma = new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const userId=c.get('userId')
  const post=await prisma.post.create({
    data : {
      title : body.title,
      content : body.content,
      authorId : userId,
      postDate : new Date()
    }
  })
  return c.json({
    msg : 'post created',
    postId : post.id
  })
})

postRouter.put('/:id',async (c) => {
  const body=await c.req.json()
  const validatedPayload=updatePostInput.safeParse(body)
  if(!validatedPayload.success){
    c.status(411)
    return c.json({
      error : validatedPayload.error.message,
      msg : 'Wrong Input'
    })
  }
  const prisma=new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const postId=c.req.param('id')
  await prisma.post.update({
    where : {
      id : postId
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

postRouter.get('/bulk',async (c) => {
  const prisma=new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const allPosts=await prisma.post.findMany({
    where : {},
    select : {
      id : true,
      author : {
        select : {
          name : true,
          id : true
        }
      },
      title : true,
      content : true,
      postDate : true
    }
  })
  const userId=c.get('userId')
  const user=await prisma.user.findUnique({
    where : {
      id : userId
    },
    select : {
      name : true,
      id : true
    }
  })
  return c.json({
    allPosts,
    user
  })
})

postRouter.get('/:id',async (c) => {
  const prisma=new PrismaClient({
    accelerateUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const postId=c.req.param('id')
  const userId=c.get('userId')
  try{
    const post=await prisma.post.findUnique({
      where : {
        id : postId
      },
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
    })
    return c.json({
      post,
      userId
    })
  }catch(e){
    c.status(411)
    return c.json({
      msg : 'Error while fetching blog'
    })
  }
})

export default postRouter