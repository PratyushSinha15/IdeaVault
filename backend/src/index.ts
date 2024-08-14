import { Hono } from 'hono'
import {userRouter} from './routes/user';
import {blogRouter} from './routes/blog';
import {verify} from 'hono/jwt';



const app = new Hono <{
  Bindings:{
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

//middleware
app.use('/api/v1/blog/*', async (c,next)=>{
  //got to the header and get the jwt
  const header= c.req.header('Authorization') || '';
  const response= await verify(header, c.env.JWT_SECRET);
  if(response.id){
    return next();
  }else{
    c.status(401);
    return c.json({error:"unauthorized"});
  }
})





export default app
