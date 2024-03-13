import React, { useState } from "react";
import Logo from "../images/p-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export function LogIn() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // function setGuestCredentials(){
  //   setLogin((prev) => (
  //     {
  //       ...prev,
  //       username: "guest123",
  //       password: "12345678"
  //     }

  //   ))
  // }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    async function handleLogIn() {
      const authDetail = {
        username: login.username,
        password: login.password,
      };

      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authDetail),
      };

      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/auth/login`,
        requestOption
      );
      const json = await response.json();
      


      if (json && json.user && json.user.username) {
        sessionStorage.setItem('userId', JSON.stringify(json.user._id));
        toast('Login Successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
          });
        navigate("/profile");
      }else{
        toast('username or password is incorrect !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
          });
      }
    }

    handleLogIn();
  }
  return (
    <div className="w-full h-screen  flex justify-center items-center ">
      <div className="w-80 h-[60vh] bg-zinc-100 px-8 py-5 rounded-[20px]">
        <img src={Logo} alt="logo" className="block w-12 h-12 mx-auto mb-2" />

        <h1 className="text-center pb-2 text-2xl leading-none tracking-tight capitalize font-semibold text-zinc-700">
          {" "}
          Welcome to PicVista
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="block w-full px-3 py-2 mt-2 border-2 border-gray-300  rounded-md"
            name="username"
            value={login.username}
            onChange={handleInputChange}
            placeholder="username"
          />
          <input
            type="password"
            className="block w-full px-3 py-2 mt-2 border-2 border-gray-300  rounded-md"
            name="password"
            value={login.password}
            onChange={handleInputChange}
            placeholder="password"
          />
          <input
            type="submit"
            className="block w-full px-3 py-2 bg-red-500 rounded-full text-white mt-2"
            value="Log in"
          />
          <span
            className="text-sm font-semibold text-zinc-600 inline-block mt-2"
          >
            Forgot your password?
          </span>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          <span>By continuing, you agree to Pinterest's</span>
          <br />
          <span>
            <b className="text-slate-900">Terms of Service; </b>
            and acknowledge you've read our
          </span>
          <br />
          <b className="text-slate-900 pb-4 inline-block">
            Privacy Policy; Notice at collection;
          </b>
          <br />
          <span className="text-zinc-700 font-semibold pb-2 inline-block">
            Not on Pinterest yet?
            <Link to="/register" className="hover:underline ps-1">
              {" "}
              Sign up{" "}
            </Link>
          </span>
          <br />
          <span className="text-black">
            Are you a business?
            <b className="text-zinc-700 font-semibold ps-1">
              Get started here!
            </b>
          </span>
        </p>
      </div>
    </div>
  );
}
