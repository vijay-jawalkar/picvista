import React, { useState, useEffect } from 'react'
import { PostCard } from '../components/PostCard';

export function Show() {
  const [posts, setPosts] = useState([]);
 

  useEffect( () => {
    const userId = JSON.parse(sessionStorage.getItem("userId") ) 
   

    async function getAllPosts(req, res){
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/posts/${userId}`);
      const json = await response.json();
      setPosts(json.userPosts)
    }
    getAllPosts()
  }, [])

 

  return (
    <div className="w-full min-h-screen  py-8 px-10">

    {/* <!-- multiple cards --> */}
<div className="flex justify-center lg:justify-start flex-wrap gap-8 ">

    {/* <% user.posts.forEach((element) => { %> */}
    {/* //   <!-- single card --> */}
    {
     posts && posts.length > 0 ?
      posts.map((post, index) => {
        return (
         <PostCard key={index} post = {post} />
        )
      })
      :
      (
        <div className="text-white w-40">
        <div className="w-full h-28 bg-sky-400 rounded-lg overflow-hidden"> 
      <img src = "" alt = "" className="w-full h-full object-cover" />
        </div>

        <h4 className="mt-2 text-sm"> title </h4>
    </div>
      )
    }
   
    {/* //  <% }) %> */}
   

</div>
</div>
  )
}
