// import React, { useEffect, useRef, useState } from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import GroupIcon from "@mui/icons-material/Group";
// import EqualizerIcon from "@mui/icons-material/Equalizer";
// import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const [accordianDashboard, setAccordianDashboard] = useState(false);

//   const ref = useRef();

//   useEffect(() => {
//     const checkIfClickOutside = (e) => {
//       if (
//         accordianDashboard &&
//         ref.current &&
//         !ref.current.contains(e.target)
//       ) {
//         setAccordianDashboard(false);
//       }
//     };

//     document.addEventListener("mousedown", checkIfClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", checkIfClickOutside);
//     };
//   }, [accordianDashboard]);

//   const handleOnClickMenu=(value)=>{
//     sessionStorage.setItem('func',value)
//   }


//   return (
//     <div className="w-3/4 text-black p-5 relative">
//       <div className="w-full bg-slate-800 text-white rounded-lg flex p-3 justify-between items-center">
//         <MenuIcon
//           sx={{ cursor: "pointer" }}
//           onClick={() => setAccordianDashboard((prev) => !prev)}
//         />

//         <img
//           className="w-8 h-8 rounded-3xl border-2"
//           src="https://th.bing.com/th/id/OIP.0NlENpusDIKyuLKTxeywiQHaFj?rs=1&pid=ImgDetMain"
//           alt="IMG"
//         />
//       </div>

//       {accordianDashboard && (
//         <div
//           ref={ref}
//           className="absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight "
//         >
//           <div>Hi, Welcome to our Gym Management system</div>
//           <p>Feel free to ask any queries</p>
//         </div>
//       )}

//       <div className="mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb5  overflow-x-auto h-[80%] ">
//         {/* //This is card block */}
//         <Link to={'/members'} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
//           <div className="bg-gradient-to-r from-[#fde68a]  to-[#f59e0b] h-3 rounded-t-lg "></div>
//           <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
//             <GroupIcon sx={{ color: "green", fontSize: "50px" }} />
//             <p className="text-xl my-2 font-semibold font-mono">Join Members</p>
//           </div>
//         </Link>
//         <Link to={'/specific/monthly'} onClick={()=>handleOnClickMenu("monthlyJoined")}  className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
//           <div className="bg-gradient-to-r from-[#fde68a]  to-[#f59e0b] h-3 rounded-t-lg "></div>
//           <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
//             <EqualizerIcon sx={{ color: "red", fontSize: "50px" }} />
//             <p className="text-xl my-2 font-semibold font-mono">
//               Monthly Joined
//             </p>
//           </div>
//         </Link>
//         <Link  to={'/specific/expiring-with-in-3-days'} onClick={()=>handleOnClickMenu("threeDayExpire")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
//           <div className="bg-gradient-to-r from-[#fde68a]  to-[#f59e0b] h-3 rounded-t-lg "></div>
//           <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
//             <AccessAlarmIcon sx={{ color: "maroon", fontSize: "50px" }} />
//             <p className="text-xl my-2 font-semibold font-mono">
//               Expiring within 3 days
//             </p>
//           </div>
//         </Link>
//         <Link  to={'/specific/expiring-with-in-4-to-7-days'} onClick={()=>handleOnClickMenu("fourToSevenDayExpire")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
//           <div className="bg-gradient-to-r from-[#fde68a]  to-[#f59e0b] h-3 rounded-t-lg "></div>
//           <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
//             <AccessAlarmIcon sx={{ color: "purple", fontSize: "50px" }} />
//             <p className="text-xl my-2 font-semibold font-mono">
//               Expiring within 4-7 days
//             </p>
//           </div>
//         </Link>
//         <Link   to={'/specific/expired'} onClick={()=>handleOnClickMenu("Expired")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
//           <div className="bg-gradient-to-r from-[#fde68a]  to-[#f59e0b] h-3 rounded-t-lg "></div>
//           <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
//             <ErrorOutlineIcon
//               sx={{ color: "LightSeaGreen", fontSize: "50px" }}
//             />
//             <p className="text-xl my-2 font-semibold font-mono">Expired</p>
//           </div>
//         </Link>
//         <Link  to={'/specific/inactive-members'} onClick={()=>handleOnClickMenu("inactiveMembers")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
//           <div className="bg-gradient-to-r from-[#fde68a]  to-[#f59e0b] h-3 rounded-t-lg "></div>
//           <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
//             <ReportGmailerrorredIcon
//               sx={{ color: "indianRed", fontSize: "50px" }}
//             />
//             <p className="text-xl my-2 font-semibold font-mono">
//               Inactive members
//             </p>
//           </div>
//         </Link>
//       </div>

//       <div className="md:bottom-4 p-4 w-3/4 mb-4 md:mb-4 absolute bg-black text-white rounded-xl text-xl">
//         Contact developer for any Technical Error at +919982612959
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import GroupIcon from "@mui/icons-material/Group";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [accordianDashboard, setAccordianDashboard] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const checkIfClickOutside = (e) => {
      if (
        accordianDashboard &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setAccordianDashboard(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickOutside);
    };
  }, [accordianDashboard]);

  const handleOnClickMenu = (value) => {
    sessionStorage.setItem("func", value);
  };

  return (
    <div className="w-full sm:w-3/4 lg:w-[80%] text-black p-5 mx-auto relative">
      {/* Header */}
      <div className="w-full bg-slate-800 text-white rounded-lg flex p-3 justify-between items-center">
        <MenuIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setAccordianDashboard((prev) => !prev)}
        />
        <img
          className="w-8 h-8 rounded-3xl border-2"
          src="https://th.bing.com/th/id/OIP.0NlENpusDIKyuLKTxeywiQHaFj?rs=1&pid=ImgDetMain"
          alt="IMG"
        />
      </div>

      {/* Accordion */}
      {accordianDashboard && (
        <div
          ref={ref}
          className="absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight mt-2"
        >
          <div>Hi, Welcome to our Gym Management system</div>
          <p>Feel free to ask any queries</p>
        </div>
      )}

      {/* Card Section */}
      <div className="mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full pb-5 overflow-x-auto h-auto">
        {/* Card Block */}
        <Link
          to={"/members"}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="bg-gradient-to-r from-[#fde68a] to-[#f59e0b] h-3 rounded-t-lg "></div>
          <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <GroupIcon sx={{ color: "green", fontSize: "50px" }} />
            <p className="text-lg my-2 font-semibold font-mono">Join Members</p>
          </div>
        </Link>
        <Link
          to={"/specific/monthly"}
          onClick={() => handleOnClickMenu("monthlyJoined")}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="bg-gradient-to-r from-[#fde68a] to-[#f59e0b] h-3 rounded-t-lg "></div>
          <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <EqualizerIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className="text-lg my-2 font-semibold font-mono">
              Monthly Joined
            </p>
          </div>
        </Link>
        <Link
          to={"/specific/expiring-with-in-3-days"}
          onClick={() => handleOnClickMenu("threeDayExpire")}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="bg-gradient-to-r from-[#fde68a] to-[#f59e0b] h-3 rounded-t-lg "></div>
          <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <AccessAlarmIcon sx={{ color: "maroon", fontSize: "50px" }} />
            <p className="text-lg my-2 font-semibold font-mono">
              Expiring within 3 days
            </p>
          </div>
        </Link>
        <Link
          to={"/specific/expiring-with-in-4-to-7-days"}
          onClick={() => handleOnClickMenu("fourToSevenDayExpire")}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="bg-gradient-to-r from-[#fde68a] to-[#f59e0b] h-3 rounded-t-lg "></div>
          <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <AccessAlarmIcon sx={{ color: "purple", fontSize: "50px" }} />
            <p className="text-lg my-2 font-semibold font-mono">
              Expiring within 4-7 days
            </p>
          </div>
        </Link>
        <Link
          to={"/specific/expired"}
          onClick={() => handleOnClickMenu("Expired")}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="bg-gradient-to-r from-[#fde68a] to-[#f59e0b] h-3 rounded-t-lg "></div>
          <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <ErrorOutlineIcon
              sx={{ color: "LightSeaGreen", fontSize: "50px" }}
            />
            <p className="text-lg my-2 font-semibold font-mono">Expired</p>
          </div>
        </Link>
        <Link
          to={"/specific/inactive-members"}
          onClick={() => handleOnClickMenu("inactiveMembers")}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="bg-gradient-to-r from-[#fde68a] to-[#f59e0b] h-3 rounded-t-lg "></div>
          <div className="py-5 px-5 justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <ReportGmailerrorredIcon
              sx={{ color: "indianRed", fontSize: "50px" }}
            />
            <p className="text-lg my-2 font-semibold font-mono">
              Inactive members
            </p>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <div className="w-full md:w-3/4 p-4 mx-auto mt-5 bg-black text-white rounded-xl text-center text-lg">
        Contact developer for any Technical Error at +919982612959
      </div>
    </div>
  );
};

export default Dashboard;
