import {Hono} from 'hono'
import postRouter from '../routes/post';
import userRouter from '../routes/user';

const app=new Hono()

app.route('/api/v1/user',userRouter)
app.route('/api/v1/post',postRouter)

export default app
