import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export  function Edit() {
  const [isForm, setIsForm] = useState({
    userID: null,
    name: "",
    username: "",
    email: ""
  });

  useEffect(() => {
 const userID = JSON.parse(sessionStorage.getItem("userId"))

 setIsForm(prev => ({
  ...prev,
  userID: userID
 }))
  }, [])

  const navigate = useNavigate();

  async function handleSubmit(event){
    event.preventDefault();

      try {
        navigate("/profile")
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/edit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(isForm)
        });
  
        if (response.ok) {
          toast('Profile Updated Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
            });
        } else {
          toast('Failed to update profile!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
            });
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update profile');
        }
      
      } catch (error) {
        toast('Error updating profile', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
          });
        console.error('Error updating profile:', error.message);
        alert(error.message);
      }
   
  }


  return (
    <div className="w-full min-h-screen py-8 px-10 ">
    <h3 className="text-xl text-white"> Edit a post </h3>

    <form onSubmit={handleSubmit}  className="flex flex-col gap-4 mt-8">
        <input type="text" placeholder="name" value={isForm.name} onChange={(e) => setIsForm(prev => ({...prev, name: e.target.value}))} className="w-full lg:w-1/4 px-3 py-1 rounded-md text-black"/>
        <input type="text" placeholder="username" value={isForm.username}  onChange={(e) => setIsForm(prev => ({...prev, username: e.target.value}))} className="w-full lg:w-1/4  px-3 py-1 rounded-md text-black" />
        <input type="text" placeholder="email" value={isForm.email}  onChange={(e) => setIsForm(prev => ({...prev, email: e.target.value}))}  className="w-full lg:w-1/4  px-3 py-1 rounded-md text-black" />
        <input type="submit" className="w-20 px-3 py-1 bg-blue-700 text-sm text-white rounded-md  font-semibold"  />
    </form>
</div>
  )
}
