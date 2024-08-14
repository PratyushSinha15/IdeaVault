import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    responseId: string;
  }
}>();

//middleware for blog route to check if the user is authorized to access the route
//we will do this by checking the jwt token in the header of the request
//we will extract the user id and pass it to the post for posting a blog
blogRouter.use("/*", async (c, next) => {
    //got to the header and get the jwt
    const header = c.req.header("Authorization") || "";
    const response = await verify(header, c.env.JWT_SECRET);
    if (response) {
        c.set("responseId", response.id as string);
        return next();
    } else {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
}
);


blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body= await c.req.json();
    try{
        const blog= await prisma.post.create({
        data:{
            title: body.title,
            content: body.content, 
            authorId: "1" //we will change this to the user id we get from the jwt,
        }
        });
        c.status(201);
        return c.json({blog});
    }catch(err){
        c.status(403);
        return c.json({error: "error creating blog"});
    }
})


//we will update the blog post using the put method
blogRouter.put('/', async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body= await c.req.json();
    try{
        const blog= await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content
        }
        });
        c.status(200);
        return c.json({blog});
    }catch(err){
        c.status(403);
        return c.json({error: "error updating blog"});
    }
})

blogRouter.get('/', async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body= await c.req.json();
    try{
        const blog= await prisma.post.findFirst({
        where:{
            id: body.id
        },
        });
        c.status(200);
        return c.json({blog});
    }catch(err){
        c.status(411);
        return c.json({error: "error while feching blog"});
    }
})

// here we will get all the blog here i want to add pagination to the blog so that we can get the blog in chunks of 10
blogRouter.get('/all', async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body= await c.req.json();
    try{
        const blog= await prisma.post.findMany({
        skip: body.skip,
        take: body.take
        });
        c.status(200);
        return c.json({blog});
    }catch(err){
        c.status(411);
        return c.json({error: "error while feching blog"});
    }
})