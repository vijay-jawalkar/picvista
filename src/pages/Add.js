import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export  function Add() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    postimage: null // This will hold the selected file
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.name === 'postimage') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    navigate("/profile")
    e.preventDefault();
  
    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('description', formData.description);
    postData.append('postimage', formData.postimage);

    const userID = JSON.parse(sessionStorage.getItem("userId"))
    postData.append('userID', userID); // Append userID to the FormData object
  
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/createpost`, {
        method: 'POST',
        body: postData
      });
  
      if (!response.ok) {
        toast('Failed to create post!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
          });
        throw new Error('Failed to create post');
      }
  
      const responseData = await response.json();
      console.log(responseData); // Handle response as needed
    } catch (error) {
      toast('Error while creating post!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
        });
      console.error('Error creating post:', error);
    }
  };
  

  return (
    <div className="w-full min-h-screen  px-7 py-3 text-white">


    <h3 className="text-xl"> Create a new post </h3>
    <hr className="opacity-20 mt-2 "/>
    
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col justify-center gap-4 w-full lg:w-1/4 mt-6 ">
    <input type = "file" name = "postimage"  onChange={handleChange} className="text-white rounded-md" />
    <input type = "text" placeholder="Title" name = "title" value={formData.title} onChange={handleChange}  className="rounded-md px-2 text-black"/>
    <textarea type = "text" placeholder="Description" name = "description" value={formData.description} onChange={handleChange}  className="rounded-md px-2 text-black h-40" > </textarea>
    <input type = "submit"className = "text-white bg-blue-700 w-fit text-sm rounded-lg px-5 py-2 font-semibold" value="Create Post"/>
    </form>
    </div>
  )
}
