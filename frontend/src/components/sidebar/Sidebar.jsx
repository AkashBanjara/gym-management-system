import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [greet, setGreet] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  function greetingMessage() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreet("Good Morning 🌻");
    } else if (currentHour < 18) {
      setGreet("Good Afternoon 🌞");
    } else if (currentHour < 21) {
      setGreet("Good Evening 🌇");
    } else {
      setGreet("Good Night ");
    }
  }

  useEffect(() => {
    greetingMessage();
    
   
  }, []);

  async function handleLogOut() {
    localStorage.clear();
    navigate('/')
  }

  return (
    <div className="w-1/4 border-2 bg-slate-900 text-white p-5 h-[100vh] ">
      <div className="text-center font-extralight  text-3xl">{localStorage.getItem("gymName")}</div>
      <div className="flex gap-5 my-5 ">
        <div className="w-[90px] h-[90px] rounded-xl ">
          <img
            className="w-full h-full rounded-full  "
            src={localStorage.getItem("gymPic")}
            alt="Gym pic"
          />
        </div>
        <div>
          <div className="text-md font-extralight">{greet}</div>
          <div className="text-sm font-semibold">Admin</div>
        </div>
      </div>

      <div className="mt-10 py-5 border-t-2 border-gray-700 ">
        <Link
          to={"/dashboard"}
          className={`flex  gap-6  font-semibold text-xl bg-slate-800 p-2 rounded-xl cursor-pointer hover:bg-gradient-to-r from-[#6b7280] via-[#22c55e] to-[#4ade80] ${
            location.pathname === "/dashboard"
              ? "border-2 bg-gradient-to-r from-[#6b7280] via-[#22c55e] to-[#4ade80] "
              : null
          } `}
        >
          <div>
            <HomeIcon />{" "}
          </div>
          <div>Dashboard</div>
        </Link>
        <Link
          to={"/members"}
          className={`flex  gap-6 mt-5  font-semibold text-xl bg-slate-800 p-2 rounded-xl cursor-pointer hover:bg-gradient-to-r from-[#6b7280] via-[#22c55e] to-[#4ade80] ${
            location.pathname === "/members"
              ? "border-2 bg-gradient-to-r from-[#6b7280] via-[#22c55e] to-[#4ade80] "
              : null
          }  `}
        >
          <div>
            <GroupIcon />{" "}
          </div>
          <div>Members</div>
        </Link>
        <div
          onClick={() => handleLogOut()}
          className="flex  gap-6 mt-5  font-semibold text-xl bg-slate-800 p-2 rounded-xl cursor-pointer hover:bg-gradient-to-r from-[#6b7280] via-[#22c55e] to-[#4ade80] "
        >
          <div>
            <LogoutIcon />{" "}
          </div>
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

