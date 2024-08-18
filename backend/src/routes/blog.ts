import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { blogInput, updateBlogInput } from "@pratyushxdev/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }, 
    Variables: {
        userId: string;
    }
}>();


//middleware for blog route to check if the user is authorized to access the route
//we will do this by checking the jwt token in the header of the request
//we will extract the user id and pass it to the post for posting a blog

  
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            //@ts-ignore
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch(e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});




 

blogRouter.post('/', async (c) => {
    console.log("inside post");
    const body = await c.req.json();
    const authorId = c.get("userId");
    const { success } = blogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Incorrect input"
        });
    }
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    });

    return c.json({
        id: blog.id
    });
});


//we will update the blog post using the put method
blogRouter.put('/', async (c)=>{
    const body= await c.req.json();

    const {success}= updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({message: "incorrect input"});
    }

    const prisma= new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try{
        const blog= await prisma.blog.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content
        }
        });
        c.status(200);
        return c.json({
            id: blog.id,
            blog
        });
    }catch(err){
        c.status(403);
        return c.json({error: "error updating blog"});
    }
})

// here we will get all the blog here i want to add pagination to the blog so that we can get the blog in chunks of 10
blogRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.blog.findMany({
        select:{
            content: true,
            title: true,
            id: true,
            author: {
                select:{
                    name: true,
                }
            }
        },
    });
	return c.json(posts);
})

blogRouter.get('/:id', async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const id=  c.req.param('id');
    try{
        const blog= await prisma.blog.findFirst({
        where:{
            id: Number(id)
        },
        select:{
            id: true,
            content: true,
            title: true,
            author: {
                select:{
                    name: true
                }
            },
        }

        });
        c.status(200);
        return c.json({blog});
    }catch(err){
        c.status(411);
        return c.json({error: "error while feching blog"});
    }
})





