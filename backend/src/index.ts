import {Hono} from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify} from 'hono/jwt'
import blogRouter from '../routes/blog';
import userRouter from '../routes/user';

const app=new Hono()

app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)

export default app
