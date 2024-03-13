import React, { useEffect, useState } from 'react'
import Logo from "../images/p-logo.png"
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export  function Profile() {
const [user, setUser] = useState([]);
// const [postData, setPostData] = useState(null);
const [ selectedFile, setSelectedFile] = useState(null);
const [posts, setPosts] = useState([]);
const [firstPost, setFirstPost] = useState([])

useEffect(() => {
 const userId = JSON.parse(sessionStorage.getItem("userId") ) 
 

  async function getUser(){
 const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/${userId}`);
 const json = await response.json();

 setUser(json.user);
//  setPostImage(json.firstPostImage)
  }

  getUser()
}, [])


// console.log("user post pic", postImage)




  useEffect( () => {
    const userId = JSON.parse(sessionStorage.getItem("userId") ) 
  

    async function getAllPosts(req, res){
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/posts/${userId}`);
      const json = await response.json();
     
      
        setFirstPost(json.userPosts && json.userPosts[0])
   
      setPosts(json.userPosts)
    }
    getAllPosts()
  }, [])

function handleUploadIcon(){
    document.querySelector("#uploadform input").click();
}

async function handleChange(event){
  if (event.target.files.length === 0) {
    toast('Something Went Wrong!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
      });
    return; // No files selected, do nothing
  }
    const file = event.target.files[0];
    setSelectedFile(file)
    console.log(file)
    // document.querySelector("#uploadform").submit();

    try {
        const formData = new FormData();
        formData.append('image', selectedFile); // Make sure to use the same field name expected by your backend

        const userID = JSON.parse(sessionStorage.getItem("userId"))
        formData.append('userID', userID); // Append userID to the FormData object
        // Send the file to the backend server using Fetch API
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/fileupload`, {
          method: 'POST',
          body: formData,
        });
  
        const json = await response.json()
        if (!response.ok) {
          toast('Something Went Wrong!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
            });
        }
  
      
      
        console.log(json.user.profileImage)
       setUser( prev => (
        {
            ...prev, profileImage: json.user.profileImage
        }
       ))
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle error here
      }


}

// console.log("first post image in user object", u user.posts[0].postImage)





  return (
    <div className="w-full min-h-screen  pt-1">

    {/* <!-- form to edit profile pic --> */}
    <form id = "uploadform"  hidden  encType="multipart/form-data">
        <input 
        onChange={handleChange}
        type="file" name = "image"  />
    </form>

    {/* <!-- profile card  --> */}
    <div className="flex flex-col justify-center items-center text-white gap-2 mt-20 ">

        <div className="relative">
            <span 
            onClick={handleUploadIcon}
            className="w-10 h-10 absolute bottom-0 right-0 bg-yellow-300 text-zinc-800 rounded-full text-lg flex justify-center items-center">
            <FaPen />
            </span>
            <div className="w-32 h-32 rounded-full bg-zinc-200 overflow-hidden">
                <img id = "profileicon" src={`${process.env.REACT_APP_HOST}/profileuploads/${user.profileImage}`} alt = "profile-pic" className="h-full w-full object-cover" />
            </div>
        </div>

       
        <h1 className="text-3xl font-semibold">{user.username}</h1>
        <h3>
            <img src={Logo} alt="logo" className=" w-5 h-5 rounded-full inline" />
            <span> {user.email} </span>
        </h3>

        <div className="text-xs font-semibold flex justify-center gap-6 mt-6">
            <span className="bg-cyan-700 py-2 px-7 rounded-full"> Share </span>
            <Link to="/edit" className="bg-cyan-700 py-2 px-7 rounded-full"> Edit profile</Link>
        </div>

        <a href="/add" className="px-7 py-2 bg-lime-700 text-white rounded-lg text-xs font-semibold mt-6">Add New Post</a>
    </div>

    {/* <!--multiple cards --> */}
    <div className="flex flex-wrap justify-center lg:justify-start gap-10  px-10 mt-10">

        {/* <!-- card --> */}
        <Link to = "/show" >
            <div className="w-52 h-32 bg-zinc-300 rounded-lg overflow-hidden">
                <img src = {posts ? `${process.env.REACT_APP_HOST}/postuploads/${firstPost.postImage}` : ""} alt = "post-img" className="h-full w-full object-cover" />
            </div>
            <div>
                <div className="inline-block text-xl font-semibold text-white mt-3">Your uploaded pins</div>
                <h4 className="text-white text-sm opacity-80"> {posts ? posts.length : 0} </h4>
            </div>
        </Link>









    </div>
</div>
  )
}
