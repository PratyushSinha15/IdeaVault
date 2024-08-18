import React from 'react'
import { Avatar } from './Blogcard'

const Appbar = () => {
  return (
    <div className='border-b flex justify-between px-10 py-4'>
        <div className='flex flex-col justify-center'>
            IdeaVault
        </div>
        <div>
            <Avatar authorName={"P"} wsize={8} hsize={8} />
        </div>
    </div>
  )
}

export default Appbar