import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import Appbar from '../components/Appbar';
import { FaPenSquare } from "react-icons/fa";
import axios from 'axios';
import { BACKEND_URL } from '../Config';
import { useNavigate } from 'react-router-dom';


function Publish() {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const navigate= useNavigate();

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const handlePublish = () => {
        if (!title.trim() || !content.trim()) {
            alert('Title and Content cannot be empty.');
            return;
        }

        axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title: title,
            content: content
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            navigate(`/blog/${response.data.id}`);
        }).catch((error) => {
            console.log(error);
        });
    }

  return (
    <div>
        <Appbar  />



        <div className='flex flex-col justify-center  items-center pt-20'>
            <div className="relative border rounded-3xl flex flex-row h-auto w-full max-w-screen-lg p-5">
                <IoAddCircleOutline  className=' flex justify-center  items-center size-14 text-slate-300' />

                    <textarea 
                        onChange={handleTitleChange}
                        placeholder="Title"
                        className="peer cursor-text text-2xl w-full border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans  font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 resize-none overflow-hidden"
                        rows={1}
                        required
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                    ></textarea>
                    

                
            </div>
            <div  className='relative border rounded-3xl flex flex-row h-auto w-full  max-w-screen-lg mt-20 p-10'>
                <FaPenSquare className='flex justify-center  items-center size-14 text-slate-300'/>
                <textarea 
                    onChange={handleContentChange}
                    placeholder="Tell Your Story"
                    className="peer  cursor-text  w-full max-w-screen-lg text-lg   border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans  font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 resize-none overflow-hidden"
                    rows={1}
                    required
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${target.scrollHeight}px`;
                    }}
                    ></textarea>
            </div>

            <button onClick={handlePublish} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2  mt-20 mb-10 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Publish</button>
        </div>
    </div>
  )
}

export default Publish
