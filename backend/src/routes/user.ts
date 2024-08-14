import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

export const userRouter = new Hono <{
    Bindings:{
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>()


    userRouter.post('/signup', async (c) => {
        const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
      
        const body= await c.req.json();
      
        //zod and pasword hashing can be added here
        try{
          const user= await prisma.user.create({
            data:{
              email: body.email,
              password: body.password,
              name: body.name,
            }
          });
          //jwt
          const jwt= await sign({id:user.id}, c.env.JWT_SECRET);
          c.status(201);
          return c.json({jwt});
      
        }catch(err){
          c.status(403);
          return c.json({error: "email already exists"});
        }
      });
      
      userRouter.post('/signin', async (c)=>{
        const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
      
        const body= await c.req.json();
        try{
          const user= await prisma.user.findUnique({
            where:{
              email: body.email,
              password: body.password,
            }
          });
      
          if(!user){
            c.status(404);
            return c.json({error: "user not found"});
          }
          //jwt
          const jwt= await sign({id:user.id}, c.env.JWT_SECRET);
          c.status(200);
          return c.json({jwt});
        }catch(err){
          c.status(404);
          return c.json({error: "user not found"});
        }
      });