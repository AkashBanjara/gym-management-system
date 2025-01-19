import React from 'react'
import CircleIcon from "@mui/icons-material/Circle";
import { colors } from "@mui/material";
import { Link } from 'react-router-dom';

const MemberCard = ({item}) => {
  return ( 
  <Link to={`/member/${item?._id}`} className=" bg-white rounded-lg p-3 hover:bg-gradient-to-r from-slate-900 to-slate-700 hover:text-white cursor-pointer">
    <div className="w-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full ">
      <img
        className=" w-full h-full rounded-full"
        src={item?.profilePic}
        alt="user image"
      />
      <CircleIcon
        sx={{ color: item?.status=== "Active" ? "greenyellow":"red", fontSize: "15px" }}
        className="absolute top-1 left-1"
      />
    </div>
    <div className="mx-auto mt-5 text-center text-xl font-semibold font-mono ">
      {item?.name}
    </div>
    <div className="mx-auto mt-2 text-center text-xl font-mono">
      {"+91 " + item?.mobileNo}
    </div>
    <div className="mx-auto mt-2 text-center  font-mono">
      Next Bill Date:{item?.nextBillDate.slice(0,10).split("-").reverse().join("-")}
    </div>
  </Link>
  )
}

export default MemberCard