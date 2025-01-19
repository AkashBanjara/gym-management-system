import React, { useEffect, useState } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MemberCard from "../../components/memberCard/MemberCard";
import Modal from "../../components/modal/Modal";
import AddMembership from "../../components/addMembership/AddMembership";
import AddMembers from "../../components/addMembers/AddMembers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Member = () => {
  const [addMemberShip, setMemberShip] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(9);

  const [noOfPage, setNoOfPage] = useState(0);

  useEffect(() => {
    fetchData(0, 9);
  }, []);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchData = async (skip, limit) => {
    await axios
      .get(`${apiUrl}/members/all-member?skip=${skip}&limit=${limit}`, {
        withCredentials: true,
      })
      .then((res) => {
   

        let totalData = res.data.totalMembers;
        setTotalData(totalData);
        setData(res.data.members);

        let extraPage = totalData % limit === 0 ? 0 : 1;
        let totalPage = parseInt(totalData / limit) + extraPage;
        setNoOfPage(totalPage);

        if (totalData === 0) {
          setStartFrom(-1);
          setEndTo(0);
        } else if (totalData < 10) {
          setStartFrom(0);
          setEndTo(totalData);
        }
      })
      .catch((error) => {
        toast.error("Something Technical Fault");
        console.log(error.message);
      });
  };

  function handleMemberShip() {
    setMemberShip((prev) => !prev);
  }

  function handleMembers() {
    setAddMember((prev) => !prev);
  }

  function handlePrev() {
    if (currentPage !== 1) {
      let currPage = currentPage - 1;
      setCurrentPage(currPage);
      var from = (currPage - 1) * 9;
      var to = currPage * 9;
      setStartFrom(from);
      setEndTo(to);

      let skipValue = skip - 9;
      setSkip(skipValue);
      fetchData(skipValue, 9);
    }
  }

  function handleNext() {
    if (currentPage !== noOfPage) {
      let currPage = currentPage + 1;
      setCurrentPage(currPage);
      var from = (currPage - 1) * 9;
      var to = currPage * 9;
      if (to > totalData) {
        to = totalData;
      }
      setStartFrom(from);
      setEndTo(to);

      let skipValue = skip + 9;
      setSkip(skipValue);
      fetchData(skipValue, 9);
    }
  }

  const handleSearchData = async () => {
    if (search !== "") {
      setIsSearchModeOn(true);

      await axios
        .get(`${apiUrl}/members/search-members?searchTerm=${search}`,{
          withCredentials: true,
        })
        .then((res) => {
         
          setData(res.data.members);
          setTotalData(res.data.totalMembers);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something Technical Error");
        });
    } else {
      if (isSearchModeOn) {
        window.location.reload();
      } else {
        toast.error("Please Enter any value");
      }
    }
  };

  return (
    <div className="text-black p-5 w-full md:w-3/4 h-[100vh] ">
      {/* block for banner  */}
      <div className="cursor-pointer border-2 bg-slate-900 flex flex-col md:flex-row justify-between w-full text-white rounded-lg p-3 ">
        <div
          onClick={() => handleMembers()}
          className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl hover:bg-gradient-to-r from-red-200 to-yellow-200 hover:text-black mb-2 md:mb-0"
        >
          Add Member <FitnessCenterIcon />{" "}
        </div>
        <div
          onClick={() => handleMemberShip()}
          className="cursor-pointer border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl hover:bg-gradient-to-r from-red-200 to-yellow-200 hover:text-black"
        >
          Membership <AddIcon />{" "}
        </div>
      </div>
      {/* block of back to dashboard btn */}
      <Link to={"/dashboard"} className="block mt-5">
        {" "}
        <ArrowBackIcon /> Back to Dashboard{" "}
      </Link>

      <div className="mt-5 w-full md:w-1/2 flex gap-1">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="border-2 w-full p-2 rounded-lg"
          placeholder="Search By Name or Mobile no."
        />
        <button
          onClick={() => handleSearchData()}
          className="bg-slate-900 text-white px-2 rounded hover:bg-slate-700"
        >
          <SearchIcon />{" "}
        </button>
      </div>

      <div className="mt-5 flex flex-col md:flex-row justify-between text-xl text-slate-900">
        <div>Total Members {isSearchModeOn ? totalData : null} </div>
        {!isSearchModeOn && (
          <div className="flex gap-5 mt-2 md:mt-0">
            <div>
              {" "}
              {startFrom + 1} - {endTo} of {totalData} Members
            </div>
            <div
              onClick={() => handlePrev()}
              className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-green-400 to-blue-500 ${
                currentPage === 1 ? "bg-gray-100 text-gray-400" : null
              }`}
            >
              <ChevronLeftIcon />
            </div>
            <div
              onClick={() => handleNext()}
              className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-green-400 to-blue-500 ${
                currentPage === noOfPage ? "bg-gray-200 text-gray-400" : null
              }`}
            >
              <ChevronRightIcon />
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-x-auto h-[65%]">
        {data.map((item, index) => {
          return <MemberCard key={index} item={item} />;
        })}
      </div>

      {addMemberShip && (
        <Modal
          handleClose={handleMemberShip}
          header={"Add Membership"}
          content={<AddMembership />}
        />
      )}

      {addMember && (
        <Modal
          handleClose={handleMembers}
          header={"Add Member"}
          content={<AddMembers />}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Member;
