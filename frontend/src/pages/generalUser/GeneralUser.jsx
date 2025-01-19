import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import MemberCard from "../../components/memberCard/MemberCard";
import {
  fourToSevenDaysExpire,
  getMonthlyJoined,
  threeDayExpire,
  expired,
  inActiveMembers,
} from "./Data";

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = sessionStorage.getItem("func");
    functionCall(func);
  }, []);

  const functionCall = async (func) => {
    try {
      switch (func) {
        case "monthlyJoined":
          setHeader("Monthly Joined Members");
          var datas = await getMonthlyJoined();
          setData(datas.members);
          break;

        case "threeDayExpire":
          setHeader("Expiring In 3 Days Members");
          var datas = await threeDayExpire();
          setData(datas.members);
          break;

        case "fourToSevenDayExpire":
          setHeader("Expiring In 4-7 Days Members ");
          var datas = await fourToSevenDaysExpire();
          setData(datas.members);
          break;

        case "Expired":
          setHeader("Expired Members ");
          var datas = await expired();
          setData(datas.member);
          break;

        case "inactiveMembers":
          setHeader("Inactive Members ");
          var datas = await inActiveMembers();

          if (Array(datas?.data?.member)) {
            setData(datas?.data?.member ?? []);
          } else {
            console.error("Invalid data structure", datas);
          }
          break;

        default:
          console.error("unknown function", func);
      }
    } catch (error) {
      console.error("Error in functiaon call", error.messsage);
    }
  };

  return (
    <div className="text-black p-5 w-3/4 flex-col">
      <div className="border-2 border-slate-900 flex justify-between w-full text-white bg-slate-800 rounded-lg p-3  ">
        <Link
          to={"/dashboard"}
          className="border-2 px-3 py-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-red-200 to-yellow-200 hover:text-black "
        >
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>

      <div className="mt-5 text-left text-slate-900]">{header}</div>

      {data.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-500">
          No members found.
        </div>
      ) : (
        <div className="text-center text-lg font-semibold text-gray-500">
          No members found.
        </div>
      )}
    </div>
  );
};

export default GeneralUser;
