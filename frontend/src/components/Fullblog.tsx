import React from 'react'
import Appbar from './Appbar'
import { Blog } from '../hooks'
import { Avatar } from './Blogcard'

const Fullblog = (
    {blog}:{blog: Blog}
) => {
  return (
    <div>
        <Appbar/>
        <div className='flex justify-center'>

            <div className='grid grid-cols-12 px-10  w-full pt-200 max-h-2xl pt-12'>
                <div className=' col-span-8'>
                    
                    <div className='text-4xl font-extrabold'>
                    {blog.title}
                    </div>
                    <div className='text-sm text-slate-500  pt-2'>
                        Posted on 18th Aug 2024
                    </div>
                    <div className='text-lg  text-slate-700  pt-4'>
                        {blog.content}
                    </div>
                </div>

                <div className=' col-span-4'>
                    <div className='text-2xl text-slate-700 font-extrabold'>
                        About the Author
                        <div className='flex justify-center items-center'>
                            <div className='pr-4  flex flex-col justify-center'>
                                <Avatar authorName={blog.author.name || "Anonymous"} wsize={7} hsize={7} />
                            </div>
                            <div>
                                <div className='text-xl font-bold   pt-2'>
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className='pt-2 text-lg font-normal text-slate-500'>
                                    The author is a web developer and a tech enthusiast.
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    </div>
  )
}

export default Fullblog