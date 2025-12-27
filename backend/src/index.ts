import {Hono} from 'hono'
import postRouter from '../routes/post';
import userRouter from '../routes/user';
import { cors } from 'hono/cors';

const app=new Hono()

app.use('/*',cors({
    origin : '*',
    allowHeaders : ['X-Custom-Header', 'Upgrade-Insecure-Requests' , 'Content-Type' , 'Authorization'],
    allowMethods : ['POST', 'GET', 'OPTIONS', 'PUT'],
}))
app.route('/api/v1/user',userRouter)
app.route('/api/v1/post',postRouter)

export default app
