import React, { useState } from "react";
import Loader from "../loader/Loader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [contentValue, setContentValue] = useState("Submit Your Email");
  const [loader, setLoader] = useState(false);

  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  function handleOnChange(e, name) {
    setInputField({ ...inputField, [name]: e.target.value });
  }

  function handleSubmit() {
    if (!emailSubmit) {
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      // setOtpValidate(true);
      // setContentValue("Submit New Password")
      verifyOTP();
    }else{
      changePassword()
    }
  }

  const changePassword=async()=>{
    setLoader(true)

    await axios.post(`${apiUrl}/auth/reset-password`,{
      email:inputField.email, newPassword:inputField.newPassword
    }).then((response)=>{
      toast.success(response.data.message)
      setLoader(false)
    }).catch(error=>{
      console.log(error)  
      toast.error(error.response.data.error)
      setLoader(false)
    })
  }

  const verifyOTP = async () => {
    setLoader(true);
    await axios
      .post(`${apiUrl}/auth/reset-password/checkOTP`, {
        email: inputField.email,
        otp: inputField.otp,
      })
      .then((response) => {
        setOtpValidate(true);
        setContentValue("Submit Your New Password");
        toast.success(response.data.message);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
        setLoader(false);
      });
  };

  const sendOtp = async () => {
    setLoader(true);
    await axios
      .post(`${apiUrl}/auth/reset-password/sendOTP`, {
        email: inputField.email,
      })
      .then((response) => {
        setEmailSubmit(true);
        setContentValue("Submit Your OTP");
        toast.success(response.data.message);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoader(false);
        toast.error(error.response.data.error);
      });
  };

 
  return (
    <div className="w-full">
      <div className="w-full m-5 ">
        <div>Enter Your Email</div>
        <input
          type="email"
          value={inputField.email}
          onChange={(e) => handleOnChange(e, "email")}
          placeholder="Enter Email"
          className="w-1/2 border-2 border-slate-300 p-2 rounded-lg "
        />
      </div>
      {emailSubmit && (
        <div className="w-full m-5 ">
          <div>Enter OTP</div>
          <input
            type="text"
            value={inputField.otp}
            onChange={(e) => handleOnChange(e, "otp")}
            placeholder="Enter OTP"
            className="w-1/2 border-2 border-slate-300 p-2 rounded-lg "
          />
        </div>
      )}
      {otpValidate && (
        <div className="w-full m-5 ">
          <div>Enter New Password</div>
          <input
            type="password"
            value={inputField.newPassword}
            onChange={(e) => handleOnChange(e, "newPassword")}
            placeholder="Enter New Password"
            className="w-1/2 border-2 border-slate-300 p-2 rounded-lg "
          />
        </div>
      )}
      <div
        onClick={() => handleSubmit()}
        className="bg-slate-800 text-white mx-auto w-2/3 text-center rounded-lg font-semibold p-3 cursor-pointer hover:bg-white hover:text-slate-800 hover:border-2  "
      >
        {contentValue}
      </div>
      {loader && <Loader />}

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
