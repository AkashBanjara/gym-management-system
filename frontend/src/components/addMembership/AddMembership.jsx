import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast, ToastContainer, } from 'react-toastify'

const AddMembership = () => {
  const [inputField, setInputField] = useState({ months: "", price: "" });
  const [membership, setMembership] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchMembership = async () => {
    await axios
      .get(`${apiUrl}/plans/get-membership`, {
        withCredentials: true,
      })
      .then((res) => {
        
        setMembership(res.data.membership);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something wrong Happend")
      });
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  function handleOnChange(e, name) {
    setInputField({ ...inputField, [name]: e.target.value });
  }



  const handleAddMembership = async()=>{
     await axios.post(`${apiUrl}/plans/add-membership`, inputField, {withCredentials:true}).then((res)=>{
          
          toast.success("Membership Added Successfully")
          fetchMembership()
          setInputField({months:"",price:""})
     }).catch(error=>{
      console.log(error)
      toast.error("Something wrong Happend")
     })
  }

  return (
    <div className="text-black  ">
      <div className="flex flex-wrap gap-5 items-center justify-center  ">
        {membership.map((item, index) => {
          return (
            <div key={index}
              className="text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flax flex-col gap-3 justify-between pt-1 pb-1
          rounded-xl font-semibold cursor-pointer hover:bg-gradient-to-r from-red-200 to-yellow-200 hover:text-black "
            >
              <div>{item.months} Month Membership</div>
              <div>Rs.{item.price} </div>
            </div>
          );
        })}
      </div>

      <hr className="my-5" />

      <div className="flex gap-10 mb-10">
        <input
          value={inputField.months}
          onChange={(e) => handleOnChange(e, "months")}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          placeholder="Add No. of Month"
        />
        <input
          value={inputField.price}
          onChange={(e) => handleOnChange(e, "price")}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          placeholder="Price"
        />
        <div onClick={handleAddMembership} className=" text-lg border-2 p-1 px-2 w-auto m-0 rounded-xl hover:bg-slate-900  hover:text-white cursor-pointer ">
          Add
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AddMembership;
