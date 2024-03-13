import React from 'react'
import { useNavigate } from 'react-router-dom'
import Page from "../images/pagenotfound.jpg"

export function PageNotFound() {
    const navigate = useNavigate();

    function handleLogout(){
        sessionStorage.clear();
        navigate("/")
    }
  return (
    <div className='h-screen w-full'>
         <section className="flex flex-col justify-center px-2 ">
        <div className="flex flex-col items-center my-4">
          <p className="text-7xl text-gray-700 font-bold my-10 dark:text-white text-center">
            404, Oops!
          </p>
          <div className="max-w-xs">
            <img className="h-40 w-80" src={Page} alt="Page Not Found" />
          </div>
        </div>
        <div className="flex justify-center my-4">
          
            <button
            onClick={handleLogout}
              type="button"
              className="w-64 text-2xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
            >
              Back To LogIn
            </button>
        
        </div>
      </section>
    </div>
  )
}
