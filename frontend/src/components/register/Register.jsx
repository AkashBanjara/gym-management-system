import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { LinearProgress, Stack } from "@mui/material";

const Register = () => {
  const [inputField, setInputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic: "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleOnChange = (e, name) => {
    setInputField({ ...inputField, [name]: e.target.value });
  };

  const uploadImage = async (e) => {
    setUploadingImage(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gym-management");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnjfxl6t2/image/upload",
        data
      );
      setInputField({ ...inputField, profilePic: response.data.url });
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, inputField, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setInputField({
        gymName: "",
        email: "",
        userName: "",
        password: "",
        profilePic: "",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-[90%] md:w-[70%] lg:w-[80%] max-w-md bg-white p-8 shadow-lg rounded-lg text-gray-800">
      <h2 className="text-center text-2xl font-bold mb-5 text-gray-800">Register</h2>

      <input
        value={inputField.email}
        onChange={(e) => handleOnChange(e, "email")}
        type="email"
        placeholder="Enter Email"
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        value={inputField.gymName}
        onChange={(e) => handleOnChange(e, "gymName")}
        type="text"
        placeholder="Enter Gym Name"
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        value={inputField.userName}
        onChange={(e) => handleOnChange(e, "userName")}
        type="text"
        placeholder="Enter Username"
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        value={inputField.password}
        onChange={(e) => handleOnChange(e, "password")}
        type="password"
        placeholder="Enter Password"
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="file"
        onChange={uploadImage}
        className="w-full mb-4 p-3 rounded-lg"
      />

      {uploadingImage && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <LinearProgress color="success" />
        </Stack>
      )}

      {inputField.profilePic && (
        <img
          src={inputField.profilePic}
          alt="Uploaded"
          className="w-32 h-32 mx-auto mb-4 rounded-full"
        />
      )}

      <button
        onClick={handleRegister}
        className="w-full p-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
      >
        Register
      </button>

      <ToastContainer />
    </div>
  );
};

export default Register;
