import React, { useEffect, useState } from 'react'
import { PostCard } from '../components/PostCard';

export function Feed() {
  const [feedPosts, setFeedPosts] = useState([]);

  useEffect(() => {
  async function getFeedPosts(){
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/allPosts/feed`);
    const data = await response.json();
    setFeedPosts(data)
  }
  getFeedPosts()
  }, [])
 
  return (
    <div class="w-full min-h-screen  py-8 px-10">

    {/* <!-- multiple cards --> */}
<div class="flex justify-center lg:justify-start flex-wrap gap-8 ">

    {/* <% posts.forEach((element) => { %> */}
    {
      feedPosts.map((post, index) => {
        return (
         <PostCard key={index} post={post}/>
        )
      })
    }
     
  

   

</div>
</div>
  )
}
