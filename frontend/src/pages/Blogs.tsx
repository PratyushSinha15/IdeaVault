import React from 'react'
import Blogcard from '../components/Blogcard'
import Appbar from '../components/Appbar'
import useBlogs from '../hooks'

const Blogs = () => {

  const {loading, blogs} = useBlogs();

  if(loading){
    return <div>Loading...</div>
  } 


  return (
    <div>
      <Appbar/>
      <div className='flex justify-center '>
        <div className='w-full max-w-xl'>

          {blogs.map(blog => (
            <Blogcard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"} 
              title={blog.title} 
              content={blog.content} 
              publishedDate={"18th Aug 2024" }
            />
          ))  
          }  
        </div>
      </div>
    </div>

  )
}

export default Blogs