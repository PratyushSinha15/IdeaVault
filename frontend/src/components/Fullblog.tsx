import React from 'react'
import Appbar from './Appbar'
import { Blog } from '../hooks'

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
                    <div className='text-xl  text-slate-600  pt-4'>
                        {blog.content}
                    </div>
                </div>

                <div className=' col-span-4'>
                    <div className='text-2xl font-extrabold'>
                        About the Author
                    </div>
                    <div className='text-sm text-slate-500  pt-2'>
                        {blog.author.name || "Anonymous"}
                    </div>
                    <div>
                        The author is a web developer 
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Fullblog