import React from 'react'
import { useBlog } from '../hooks'
import { useParams } from 'react-router-dom';
import Fullblog from '../components/Fullblog';

const Blog = () => {
  const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });


  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div>
      {blog && <Fullblog blog={blog}/>}
    </div>
  )
}

export default Blog