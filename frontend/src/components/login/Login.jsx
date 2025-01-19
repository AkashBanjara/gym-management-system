import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, loginField, {
        withCredentials: true,
      });
      const { gym, token } = response.data;

      localStorage.setItem("gymName", gym.gymName);
      localStorage.setItem("gymPic", gym.profilePic);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("token", token);

      toast.success("Login successfully");
      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed";
      toast.error(errorMessage);
    }
  };

  function handleOnChange(event, name) {
    setLoginField({ ...loginField, [name]: event.target.value });
  }

  return (
    <div className="w-[90%] md:w-[70%] lg:w-[80%] max-w-md bg-white p-8 shadow-lg rounded-lg text-gray-800">
      <h2 className="text-center text-2xl font-bold mb-5 text-gray-800">Login</h2>

      <input
        value={loginField.userName}
        onChange={(event) => handleOnChange(event, "userName")}
        type="text"
        placeholder="Enter Username"
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        value={loginField.password}
        onChange={(event) => handleOnChange(event, "password")}
        type="password"
        placeholder="Enter Password"
        className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={handleLogin}
        className="w-full p-3 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600"
      >
        Login
      </button>

      <ToastContainer />
    </div>
  );
};

export default Login;
