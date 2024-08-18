import React from 'react'
import { Link } from 'react-router-dom';

interface BlogcardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const calculateReadingTime = (content: string, wordsPerMinute: number = 40): number => {
  const wordsArray = content.trim().split(/\s+/);
  const totalWords = wordsArray.length;
  const readingTime = totalWords / wordsPerMinute;

  return Math.ceil(readingTime);
};

const Blogcard = ({id, authorName, title, content, publishedDate }: BlogcardProps) => {
  const contentPreview = content.length>100? content.slice(0, 100) + "...": content;
  const readingTime = calculateReadingTime(content);


  return (
    <Link to={`/blog/${id}`} className='no-underline'>
      <div className='p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer '>
        <div className='flex' >
            <Avatar authorName={authorName} />
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
            <div className='pl-1 text-stone-400 text-sm flex items-center '>
            <span className='flex justify-center flex-col pl-2 '>&#9672;</span> 
            </div>
            <div className='pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col'>
              {publishedDate}
            </div>
        </div>
        <div className='text-xl pt-2  font-semibold'>
          {title}
        </div>
        <div className='text-md font-thin'>
          {contentPreview}
        </div>
        <div className='font-sans text-sm pt-3 text-slate-400'>
          {readingTime} min read
        </div>
      </div>
    </Link>
  )
}

export function Avatar({ authorName, wsize = 6, hsize = 6 }: { authorName: string, wsize?: number, hsize?: number }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
      style={{ width: `${wsize * 0.25}rem`, height: `${hsize * 0.25}rem` }}
    >
      <span className="font-thin text-gray-600 dark:text-gray-300">{authorName.slice(0, 1)}</span>
    </div>
  );
}


export default Blogcard