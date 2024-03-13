import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';

export function PostDetail() {
  const [post, setPost] = useState([]);
    const { postId } = useParams();
   

    useEffect(() => {
     async function fetchPost(){
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/posts/post-detail/${postId}`);
      const data = await response.json();
    
      setPost(data)
     }

     fetchPost()
    }, []) // eslint-disable-line
    
  return (
    <div className='w-full min-h-screen flex justify-center   py-8 px-10'>
        <div className='flex flex-col justify-start gap-3'>
        <img src = {`${process.env.REACT_APP_HOST}/postuploads/${post.postImage}`} alt = "Post Detail " className='h-48 w-80 bg-slate-200' />
        <h2 className='text-2xl font-semibold text-zinc-200'> {post.title} </h2>
        <p className='text-md text-zinc-300'> {post.description} </p>
        </div>
        
    </div>
  )
}

