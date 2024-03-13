import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../images/p-logo.png"

export default function Header() {
  const navigate = useNavigate();

  function handleLogout(){
    sessionStorage.clear();
    navigate("/")
  }

  return (
    <div className="w-full flex justify-between items-center bg-transparent text-zinc-200 px-10 py-3">
    <h3>
      <img src = {Logo} alt='logo' className='h-12 w-12 rounded-full' />
    </h3>
    {
      sessionStorage.getItem("userId") ? (
        <div className="flex items-center gap-4 lg:gap-10 text-zinc-200">
        <Link to = "/profile" className='font-semibold hover:underline underline-offset-2'> Profile </Link>
        <Link to = "/feed" className='font-semibold hover:underline underline-offset-2'> Feed </Link>
        <button 
        onClick={handleLogout}
        className="bg-red-700 hover:bg-red-600 px-3 py-2 text-sm font-semibold rounded-lg"> Logout </button>
      </div>
      )
      :
      (
        <div className="flex items-center gap-4 lg:gap-10">
        <Link to = "/" className='text-sm font-semibold py-1 px-3 bg-orange-600 hover:bg-orange-700 rounded-md'> Login </Link>
        <Link to = "/register" className='text-sm font-semibold py-1 px-3 bg-orange-600 hover:bg-orange-700 rounded-md'> Signup </Link>
      </div>
      )
    }
   
    </div>
  )
}
