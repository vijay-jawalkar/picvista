import React, { useState } from "react";
import Logo from "../images/p-logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [signup, setSignup] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setSignup((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    async function handleRegister() {
      const authDetail = {
        name: signup.name,
        username: signup.username,
        email: signup.email,
        password: signup.password,
      };

      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authDetail),
      };

      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/auth/signup`,
        requestOption
      );
      const json = await response.json();
      console.log(json);

      if (json.user.username) {
        sessionStorage.setItem('userId', JSON.stringify(json.user._id));
        navigate("/profile");
      }
    }

    handleRegister();
  }

  return (
    <div className="w-full h-screen  flex justify-center items-center ">
      <div className="w-80 h-[70vh] bg-zinc-100 px-8 py-5 rounded-[20px]">
        <img src={Logo} alt="logo" className="block w-12 h-12 mx-auto mb-2" />

        <h1 className="text-center pb-2 text-2xl leading-none tracking-tight capitalize font-semibold text-zinc-700">
          {" "}
          Create new account
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="block w-full px-3 py-2 mt-2 border-2 border-gray-300  rounded-md"
            name="name"
            value={signup.name}
            onChange={handleInputChange}
            placeholder="full name"
          />
          <input
            type="text"
            className="block w-full px-3 py-2 mt-2 border-2 border-gray-300  rounded-md"
            name="username"
            value={signup.username}
            onChange={handleInputChange}
            placeholder="username"
          />
          <input
            type="email"
            className="block w-full px-3 py-2 mt-2 border-2 border-gray-300  rounded-md"
            name="email"
            value={signup.email}
            onChange={handleInputChange}
            placeholder="email"
          />
          <input
            type="password"
            className="block w-full px-3 py-2 mt-2 border-2 border-gray-300  rounded-md"
            name="password"
            value={signup.password}
            onChange={handleInputChange}
            placeholder="password"
          />
          <input
            type="submit"
            className="block w-full px-3 py-2 bg-red-500 rounded-full text-white mt-2"
            value="Sign up"
          />
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          <span>By continuing, you agree to Pinterest's</span>
          <br />
          <span>
            <b className="text-slate-900">Terms of Service; </b>
            and acknowledge you've read our
          </span>
          <br />
          <b className="text-slate-900 pb-4 inline-block pb-4">
            Privacy Policy; Notice at collection;
          </b>
          <br />
          <span className="text-zinc-700 font-semibold pb-2 inline-block">
            Not on Pinterest yet?
            <Link to="/" className="hover:underline">
              {" "}
              Log in{" "}
            </Link>
          </span>
          <br />
        </p>
      </div>
    </div>
  );
}
