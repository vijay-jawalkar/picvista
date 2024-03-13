import React from 'react'
import { useNavigate } from 'react-router';

export function PostCard({post}) {
    const navigate = useNavigate();

    function handleNavigate(){
        navigate(`/post-detail/${post._id}`)
      }

  return (
    <div  className="text-white w-40">
    <div className="w-full h-28 bg-sky-400 rounded-lg overflow-hidden"> 
  <img onClick={handleNavigate}  src = {`${process.env.REACT_APP_HOST}/postuploads/${post.postImage}`}  alt = "post" className="w-full h-full object-cover" />
    </div>

    <h4 className="mt-2 text-sm"> {post.title} </h4>
</div>
  )
}
