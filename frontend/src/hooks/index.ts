import { useState, useEffect } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../Config';


export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }

}




const useBlogs = () => {

    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
            .then(res => {
                setBlogs(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
  return {
        loading,
        blogs
    }
}

export default useBlogs